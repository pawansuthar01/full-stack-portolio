export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full  text-center bg-gradient-to-r from-[#242424] to-[#242424] shadow p-5">
      ©{year} Pawan Suthar. All rights reserved.
    </footer>
  );
}
