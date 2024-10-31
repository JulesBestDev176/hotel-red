import "./styles/globals.css";

export const metadata = {
  title: "Mon Hotel",
  description: "Gestion d'hotel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
