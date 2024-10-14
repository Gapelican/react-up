import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronDown, Search } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { 
  faCoffee, faHeart, faStar, faUser, faHome, faCog, faEnvelope, faBook,
  faMusic, faCamera, faCar, faPlane, faBicycle, faTree, faSun, faMoon,
  faCloud, faUmbrella, faFire, faSnowflake, faSearch
} from "@fortawesome/free-solid-svg-icons"

// Add icons to the library
library.add(faCoffee, faHeart, faStar, faUser, faHome, faCog, faEnvelope, faBook,
  faMusic, faCamera, faCar, faPlane, faBicycle, faTree, faSun, faMoon,
  faCloud, faUmbrella, faFire, faSnowflake, faSearch)

export default function Component() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [filteredIcons, setFilteredIcons] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const allIcons = [
    "coffee", "heart", "star", "user", "home", "cog", "envelope", "book",
    "music", "camera", "car", "plane", "bicycle", "tree", "sun", "moon",
    "cloud", "umbrella", "fire", "snowflake"
  ]

  const iconsPerPage = 12
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage)

  useEffect(() => {
    const filtered = allIcons.filter(icon => 
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredIcons(filtered)
    setCurrentPage(1)
  }, [searchTerm])

  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon)
    setOpen(false)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentPage(page)
  }

  const paginatedIcons = filteredIcons.slice(
    (currentPage - 1) * iconsPerPage,
    currentPage * iconsPerPage
  )

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
            "Selecionar Ícone"
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar ícones..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 w-full"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 py-4">
          {paginatedIcons.map((icon) => (
            <Button
              key={icon}
              variant="outline"
              onClick={() => handleIconSelect(icon)}
              className="w-full h-[60px] flex flex-col items-center justify-center"
              title={icon}
            >
              <FontAwesomeIcon icon={icon} className="text-2xl mb-1" />
              <span className="text-xs">{icon}</span>
            </Button>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={(e) => handlePageChange(Math.max(1, currentPage - 1), e)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={(e) => handlePageChange(index + 1, e)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={(e) => handlePageChange(Math.min(totalPages, currentPage + 1), e)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </DialogContent>
    </Dialog>
  )
}