import { Nav } from '@/components/ui/Nav'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Stack } from '@/components/sections/Stack'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
