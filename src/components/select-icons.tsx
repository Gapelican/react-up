import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, Search } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faHeart,
  faStar,
  faUser,
  faHome,
  faCog,
  faEnvelope,
  faBook,
  faMusic,
  faCamera,
  faCar,
  faPlane,
  faBicycle,
  faTree,
  faSun,
  faMoon,
  faCloud,
  faUmbrella,
  faFire,
  faSnowflake,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(
  faCoffee,
  faHeart,
  faStar,
  faUser,
  faHome,
  faCog,
  faEnvelope,
  faBook,
  faMusic,
  faCamera,
  faCar,
  faPlane,
  faBicycle,
  faTree,
  faSun,
  faMoon,
  faCloud,
  faUmbrella,
  faFire,
  faSnowflake,
  faSearch,
)

export default function Component() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [icons, setIcons] = useState<string[]>([])
  const [filteredIcons, setFilteredIcons] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const allIcons = [
    'coffee',
    'heart',
    'star',
    'user',
    'home',
    'cog',
    'envelope',
    'book',
    'music',
    'camera',
    'car',
    'plane',
    'bicycle',
    'tree',
    'sun',
    'moon',
    'cloud',
    'umbrella',
    'fire',
    'snowflake',
  ]

  const loadMoreIcons = () => {
    const startIndex = (page - 1) * 20
    const newIcons = allIcons.slice(startIndex, startIndex + 20)
    setIcons((prev) => [...prev, ...newIcons])
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    loadMoreIcons()
  }, [])

  useEffect(() => {
    if (inView && icons.length < allIcons.length) {
      loadMoreIcons()
    }
  }, [inView, icons.length])

  useEffect(() => {
    const filtered = icons.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredIcons(filtered)
  }, [searchTerm, icons])

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
    setOpen(false)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selectedIcon ? (
            <>
              <FontAwesomeIcon icon={selectedIcon} className="mr-2" />
              {selectedIcon}
            </>
          ) : (
            'Selecionar Ícone'
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecione um Ícone</DialogTitle>
          <DialogDescription>
            Busque e clique em um dos ícones abaixo para selecioná-lo.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar ícones..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4"
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-4 gap-4 py-4">
            {filteredIcons.map((icon) => (
              <Button
                key={icon}
                variant="outline"
                onClick={() => handleIconSelect(icon)}
                className="flex h-[60px] w-full flex-col items-center justify-center"
                title={icon}
              >
                <FontAwesomeIcon icon={icon} className="mb-1 text-2xl" />
                <span className="text-xs">{icon}</span>
              </Button>
            ))}
            <div ref={ref} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
