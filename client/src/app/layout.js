import "./globals.css";

export const metadata = {
  title: "DormSync",

  description:
    "Smart Hostel Management System",
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  );
}