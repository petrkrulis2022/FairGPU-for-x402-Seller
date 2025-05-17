// Fixed JSX escaping issue
export default function SellerPage() {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Seller&apos;s Page
      </h1>
      <p className="text-lg mb-6">
        This is a demo seller&apos;s website. To access exclusive content,
        please visit the protected page.
      </p>
      <a
        href="/seller/protected"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Protected Content
      </a>
    </div>
  );
}
