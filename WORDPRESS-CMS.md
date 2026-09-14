# Khat Headless WordPress CMS

The Khat website is now prepared to use WordPress as the secure backend CMS while Next.js remains the public frontend.

## Admin access

Use WordPress for all non-technical administration:

- Admin URL: `WORDPRESS_ADMIN_URL`
- Login: WordPress email/username + password
- Password reset: `/wp-login.php?action=lostpassword`
- User roles: WordPress roles and capabilities
- Media library: WordPress Media

Do not store administrator emails, passwords, or password hashes in this repository.

## Required environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://khatmarketing.ir
WORDPRESS_API_URL=https://admin.khatmarketing.ir
WORDPRESS_ADMIN_URL=https://admin.khatmarketing.ir/wp-admin
WORDPRESS_MEDIA_HOST=admin.khatmarketing.ir
WORDPRESS_REVALIDATE_SECONDS=300
WORDPRESS_APPLICATION_USERNAME=
WORDPRESS_APPLICATION_PASSWORD=
NEXT_PUBLIC_GA_ID=
CONTACT_WEBHOOK_URL=
SENTRY_DSN=
```

Create a restricted WordPress Application Password user for form and media forwarding. Do not use a human owner/admin password as an environment variable.

## WordPress content model

Install Advanced Custom Fields or an equivalent fields plugin and register these public REST-enabled post types.

### Homepage

Use a WordPress page with slug `home` and fields:

- `hero_headline`
- `hero_description`
- `hero_image`
- `cta_text`
- `cta_url`
- `sections`
- `featured_news`

The frontend keeps the approved Khat layout and visual system locked in code. WordPress only controls content values.

### Courses

Custom post type: `khat_course`

Fields:

- `price`
- `description`
- `category`
- `status`
- featured image

Admin actions:

- create
- edit
- delete
- publish/draft/archive

### Workshops

Custom post type: `khat_workshop`

Fields:

- `date`
- `capacity`
- `registered_count`
- `description`
- `status`
- featured image

Registration data is submitted through `/api/registration` and forwarded to the WordPress custom endpoint `/wp-json/khat/v1/registrations`.

### News

Use standard WordPress posts.

Fields:

- title
- content
- excerpt
- featured image
- category
- tags
- `seo_description`
- `category_label`

The frontend reads posts from `/wp-json/wp/v2/posts`.

### Services

Custom post type: `khat_service`

Fields:

- `short_description`
- body content
- featured image
- `display_order`
- `status`

The frontend reads services from `/wp-json/wp/v2/khat_service`.

### Forms

The Next.js app exposes:

- `/api/contact`
- `/api/consultation`
- `/api/registration`
- `/api/payment-receipt`

WordPress must expose matching protected custom REST endpoints:

- `/wp-json/khat/v1/consultation-requests`
- `/wp-json/khat/v1/registrations`
- `/wp-json/khat/v1/payment-receipts`

Each submission should be stored as a private admin-review post type in WordPress.

### Payments

Payment receipt uploads are sent to `/api/payment-receipt`.

The endpoint:

- accepts JPG, PNG, WebP, or PDF
- limits files to 5 MB
- uploads the receipt to WordPress Media
- creates a WordPress payment review record with status `pending_review`

Admin reviews payment records inside WordPress and marks them approved/rejected.

## Recommended WordPress plugins

- Advanced Custom Fields
- Yoast SEO or Rank Math
- JWT/Auth hardening only if needed; Application Passwords are enough for server-to-server forwarding
- WP Mail SMTP
- Activity Log
- Limit Login Attempts Reloaded or equivalent
- Wordfence or another reputable security plugin
- UpdraftPlus or host-level backups

## Roles

- OWNER: administrator-level access, users, settings, SEO, content, payments
- ADMIN: editor plus media/forms/payments/services/courses/workshops
- EDITOR: posts/news/content only

Use WordPress capabilities to enforce this. The public Next.js app does not manage WordPress user accounts.

## Backup and recovery

- Daily database backup
- Daily uploads/media backup
- Weekly offsite backup
- Monthly restore test on staging
- Keep at least 30 days of backups

## Deployment workflow

1. Develop locally.
2. Deploy preview.
3. Verify WordPress API and media host environment variables.
4. Run `npm run lint`, `npm run build`, `npm test`, route checks, and browser QA.
5. Deploy production.
6. Verify `/sitemap.xml`, `/robots.txt`, WordPress content, and form submissions.
