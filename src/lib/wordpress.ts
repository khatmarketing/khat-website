type WordPressRendered = { rendered?: string };
type WordPressMedia = { source_url?: string; alt_text?: string };
type WordPressEmbedded = { "wp:featuredmedia"?: WordPressMedia[] };

export type WordPressEntity = {
  id: number;
  slug: string;
  date?: string;
  modified?: string;
  title?: WordPressRendered;
  excerpt?: WordPressRendered;
  content?: WordPressRendered;
  acf?: Record<string, unknown>;
  _embedded?: WordPressEmbedded;
};

export type ManagedService = {
  slug: string;
  title: string;
  intro: string;
  image: string;
  paragraphs: string[];
  active?: boolean;
  order?: number;
};

export type ManagedArticle = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  paragraphs: string[];
  status?: string;
};

export type ManagedCourse = {
  slug: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  status: "draft" | "published" | "archived" | string;
};

export type ManagedWorkshop = {
  slug: string;
  title: string;
  date: string;
  capacity: number;
  registered: number;
  image: string;
  description: string;
  status: string;
};

const wordpressUrl = process.env.WORDPRESS_API_URL?.replace(/\/$/, "");
const revalidateSeconds = Number(process.env.WORDPRESS_REVALIDATE_SECONDS || 300);

function authHeader() {
  const username = process.env.WORDPRESS_APPLICATION_USERNAME;
  const password = process.env.WORDPRESS_APPLICATION_PASSWORD;
  if (!username || !password) return undefined;
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

function endpoint(path: string) {
  if (!wordpressUrl) return "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${wordpressUrl}${normalizedPath}`;
}

export function isWordPressConfigured() {
  return Boolean(wordpressUrl);
}

export function wordpressAdminUrl() {
  return process.env.WORDPRESS_ADMIN_URL || (wordpressUrl ? wordpressUrl.replace(/\/wp-json$/, "/wp-admin") : "");
}

export function wordpressPasswordResetUrl() {
  const adminUrl = wordpressAdminUrl();
  return adminUrl ? `${adminUrl.replace(/\/wp-admin\/?$/, "")}/wp-login.php?action=lostpassword` : "";
}

export async function wpFetch<T>(
  path: string,
  options: { auth?: boolean; method?: string; body?: BodyInit; headers?: HeadersInit } = {},
) {
  const url = endpoint(path);
  if (!url) return null;

  const headers = new Headers(options.headers);
  if (options.auth) {
    const authorization = authHeader();
    if (!authorization) return null;
    headers.set("authorization", authorization);
  }

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      body: options.body,
      headers,
      next: options.method ? undefined : { revalidate: revalidateSeconds },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function decodeHtml(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function stripHtml(value = "") {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function acfString(entity: WordPressEntity, key: string, fallback = "") {
  const value = entity.acf?.[key];
  return typeof value === "string" ? value : fallback;
}

function acfNumber(entity: WordPressEntity, key: string, fallback = 0) {
  const value = entity.acf?.[key];
  return typeof value === "number" ? value : fallback;
}

function featuredImage(entity: WordPressEntity, fallback: string) {
  return entity._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallback;
}

function contentParagraphs(entity: WordPressEntity) {
  const html = entity.content?.rendered || "";
  const paragraphs = html
    .split(/<\/p>/i)
    .map(stripHtml)
    .filter(Boolean);
  return paragraphs.length ? paragraphs : [stripHtml(html)].filter(Boolean);
}

export async function getWordPressServices() {
  const posts = await wpFetch<WordPressEntity[]>(
    "/wp-json/wp/v2/khat_service?per_page=100&_embed=1&orderby=menu_order&order=asc",
  );
  return posts?.map<ManagedService>((post) => ({
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    intro: acfString(post, "short_description", stripHtml(post.excerpt?.rendered)),
    image: featuredImage(post, "/images/home-hero-v2.png"),
    paragraphs: contentParagraphs(post),
    active: acfString(post, "status", "active") !== "inactive",
    order: acfNumber(post, "display_order", 0),
  }));
}

export async function getWordPressService(slug: string) {
  const posts = await wpFetch<WordPressEntity[]>(
    `/wp-json/wp/v2/khat_service?slug=${encodeURIComponent(slug)}&_embed=1`,
  );
  const post = posts?.[0];
  if (!post) return null;
  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    intro: acfString(post, "short_description", stripHtml(post.excerpt?.rendered)),
    image: featuredImage(post, "/images/home-hero-v2.png"),
    paragraphs: contentParagraphs(post),
    active: acfString(post, "status", "active") !== "inactive",
    order: acfNumber(post, "display_order", 0),
  } satisfies ManagedService;
}

export async function getWordPressArticles() {
  const posts = await wpFetch<WordPressEntity[]>("/wp-json/wp/v2/posts?per_page=100&_embed=1");
  return posts?.map<ManagedArticle>((post) => ({
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    description: acfString(post, "seo_description", stripHtml(post.excerpt?.rendered)),
    image: featuredImage(post, "/images/news.png"),
    date: post.date || "",
    category: acfString(post, "category_label", "خبرهای خط"),
    paragraphs: contentParagraphs(post),
    status: acfString(post, "status", "published"),
  }));
}

export async function getWordPressArticle(slug: string) {
  const posts = await wpFetch<WordPressEntity[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
  );
  const post = posts?.[0];
  if (!post) return null;
  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    description: acfString(post, "seo_description", stripHtml(post.excerpt?.rendered)),
    image: featuredImage(post, "/images/news.png"),
    date: post.date || "",
    category: acfString(post, "category_label", "خبرهای خط"),
    paragraphs: contentParagraphs(post),
    status: acfString(post, "status", "published"),
  } satisfies ManagedArticle;
}

export async function getWordPressCourses() {
  const posts = await wpFetch<WordPressEntity[]>("/wp-json/wp/v2/khat_course?per_page=100&_embed=1");
  return posts?.map<ManagedCourse>((post) => ({
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    price: acfString(post, "price"),
    image: featuredImage(post, "/images/home-hero-v2.png"),
    description: acfString(post, "description", stripHtml(post.excerpt?.rendered)),
    category: acfString(post, "category"),
    status: acfString(post, "status", "published"),
  }));
}

export async function getWordPressWorkshops() {
  const posts = await wpFetch<WordPressEntity[]>("/wp-json/wp/v2/khat_workshop?per_page=100&_embed=1");
  return posts?.map<ManagedWorkshop>((post) => ({
    slug: post.slug,
    title: stripHtml(post.title?.rendered),
    date: acfString(post, "date"),
    capacity: acfNumber(post, "capacity", 0),
    registered: acfNumber(post, "registered_count", 0),
    image: featuredImage(post, "/images/home-hero-v2.png"),
    description: acfString(post, "description", stripHtml(post.excerpt?.rendered)),
    status: acfString(post, "status", "published"),
  }));
}

export async function submitWordPressForm(kind: string, payload: Record<string, unknown>) {
  return wpFetch<{ id?: number; ok?: boolean }>(`/wp-json/khat/v1/${kind}`, {
    auth: true,
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function uploadWordPressMedia(file: File) {
  const authorization = authHeader();
  if (!authorization || !wordpressUrl) return null;

  const headers = new Headers({
    authorization,
    "content-disposition": `attachment; filename="${encodeURIComponent(file.name)}"`,
    "content-type": file.type || "application/octet-stream",
  });

  try {
    const response = await fetch(endpoint("/wp-json/wp/v2/media"), {
      method: "POST",
      headers,
      body: Buffer.from(await file.arrayBuffer()),
    });
    if (!response.ok) return null;
    return (await response.json()) as { id: number; source_url?: string };
  } catch {
    return null;
  }
}
