import { VenueProvider } from "@/context/VenueContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      
return <VenueProvider>
  {children}
</VenueProvider> 

}