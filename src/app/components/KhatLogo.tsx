import Image from "next/image";
export default function KhatLogo() {
  return <span className="khat-logo"><Image src="/images/brand/khat-logo.png" alt="لوگو و لوگوتایپ خط" width={160} height={160} sizes="160px" loading="eager" /></span>;
}
