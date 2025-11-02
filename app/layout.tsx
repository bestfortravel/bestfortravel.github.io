import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { TranslationProvider } from '@/components/Translation/TranslationProvider';
export const metadata: Metadata = {
  title: 'BestForTravel',
  description: 'Share and explore travel stories around the world.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
