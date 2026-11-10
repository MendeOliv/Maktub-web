import type {Metadata} from 'next'; import './globals.css';
export const metadata:Metadata={title:'MAKTUB — Atelier de Noivas',description:'O vestido dos seus sonhos espera por si.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-AO"><body>{children}</body></html>}
