import Ecommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | Manojkumar - Next.js Dashboard Template",
  description: "This is Next.js Home for Manojkumar Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Ecommerce />
      </DefaultLayout>
    </>
  );
}
