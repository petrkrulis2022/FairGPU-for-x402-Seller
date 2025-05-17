import WalletConnect from "../app/wallet";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-end items-center">
        <WalletConnect />
      </div>
    </header>
  );
}
