import React, { useState, useMemo, useEffect } from 'react'
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Search,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type MenuItem = {
  id: string
  title: string
  icon?: React.ReactNode
  href?: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    id: '2',
    title: 'Usuários',
    icon: <Users className="h-4 w-4" />,
    submenu: [
      {
        id: '2.1',
        title: 'Lista de Usuários',
        href: '/users/list',
      },
      {
        id: '2.2',
        title: 'Grupos',
        submenu: [
          {
            id: '2.2.1',
            title: 'Administradores',
            href: '/users/groups/admins',
          },
          {
            id: '2.2.2',
            title: 'Moderadores',
            href: '/users/groups/moderators',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Relatórios',
    icon: <FileText className="h-4 w-4" />,
    submenu: [
      {
        id: '3.1',
        title: 'Vendas',
        href: '/reports/sales',
      },
      {
        id: '3.2',
        title: 'Tráfego',
        href: '/reports/traffic',
      },
    ],
  },
  {
    id: '4',
    title: 'Configurações',
    icon: <Settings className="h-4 w-4" />,
    submenu: [
      {
        id: '4.1',
        title: 'Geral',
        href: '/settings/general',
      },
      {
        id: '4.2',
        title: 'Avançado',
        submenu: [
          {
            id: '4.2.1',
            title: 'Segurança',
            href: '/settings/advanced/security',
          },
          {
            id: '4.2.2',
            title: 'Backup',
            submenu: [
              {
                id: '4.2.2.1',
                title: 'Local',
                href: '/settings/advanced/backup/local',
              },
              {
                id: '4.2.2.2',
                title: 'Nuvem',
                href: '/settings/advanced/backup/cloud',
              },
            ],
          },
        ],
      },
    ],
  },
]

const flattenMenu = (items: MenuItem[]): MenuItem[] => {
  return items.reduce((acc: MenuItem[], item) => {
    acc.push(item)
    if (item.submenu) {
      acc.push(...flattenMenu(item.submenu))
    }
    return acc
  }, [])
}

const searchMenu = (items: MenuItem[], searchTerm: string): Set<string> => {
  const lowercaseSearchTerm = searchTerm.toLowerCase()
  const flatMenu = flattenMenu(items)
  const matchingItems = flatMenu.filter((item) =>
    item.title.toLowerCase().includes(lowercaseSearchTerm),
  )

  const visibleItemIds = new Set<string>()
  matchingItems.forEach((item) => {
    let currentId = item.id
    while (currentId) {
      visibleItemIds.add(currentId)
      currentId = currentId.split('.').slice(0, -1).join('.')
    }
  })

  return visibleItemIds
}

const MenuItemComponent: React.FC<{
  item: MenuItem
  depth: number
  visibleItems: Set<string>
  expandedItems: string[]
  favorites: Set<string>
  onToggle: (itemId: string) => void
  onToggleFavorite: (itemId: string) => void
}> = ({
  item,
  depth,
  visibleItems,
  expandedItems,
  favorites,
  onToggle,
  onToggleFavorite,
}) => {
  const isVisible = visibleItems.size === 0 || visibleItems.has(item.id)
  const isExpanded = expandedItems.includes(item.id)
  const isFavorite = favorites.has(item.id)
  const isMainItem = depth === 0

  if (!isVisible) {
    return null
  }

  const hasSubmenu = item.submenu && item.submenu.length > 0

  return (
    <>
      {hasSubmenu ? (
        <AccordionItem
          value={item.id}
          className={cn('border-none', depth > 0 && 'ml-4')}
        >
          <AccordionTrigger
            onClick={() => onToggle(item.id)}
            className={cn(
              'group py-2 hover:no-underline',
              isExpanded ? 'font-semibold' : 'font-normal',
            )}
          >
            <span className="flex flex-1 items-center gap-2">
              {item.icon}
              {item.title}
            </span>
            {isMainItem && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(item.id)
                }}
              >
                <Star
                  className={cn(
                    'h-4 w-4',
                    isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground',
                  )}
                />
                <span className="sr-only">
                  {isFavorite
                    ? 'Remove dos favoritos'
                    : 'Adicionar aos favoritos'}
                </span>
              </Button>
            )}
          </AccordionTrigger>
          <AccordionContent>
            {item.submenu!.map((subItem) => (
              <MenuItemComponent
                key={subItem.id}
                item={subItem}
                depth={depth + 1}
                visibleItems={visibleItems}
                expandedItems={expandedItems}
                favorites={favorites}
                onToggle={onToggle}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ) : (
        <div
          className={cn(
            'group flex items-center justify-between py-2',
            depth > 0 && 'ml-4',
          )}
        >
          <a
            href={item.href}
            className="flex flex-1 items-center gap-2 hover:underline"
          >
            {item.icon}
            {item.title}
          </a>
          {isMainItem && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => onToggleFavorite(item.id)}
            >
              <Star
                className={cn(
                  'h-4 w-4',
                  isFavorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground',
                )}
              />
              <span className="sr-only">
                {isFavorite
                  ? 'Remove dos favoritos'
                  : 'Adicionar aos favoritos'}
              </span>
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default function SidebarMenu() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const visibleItems = useMemo(() => {
    return searchMenu(menuItems, searchTerm)
  }, [searchTerm])

  const handleToggle = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    )
  }

  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  // Expand all visible items when searching
  useEffect(() => {
    if (searchTerm) {
      setExpandedItems(Array.from(visibleItems))
    } else {
      setExpandedItems([])
    }
  }, [searchTerm, visibleItems])

  const favoriteItems = useMemo(() => {
    return menuItems.filter((item) => favorites.has(item.id))
  }, [favorites])

  return (
    <div className="h-screen w-64 overflow-y-auto bg-background p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar no menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {favoriteItems.length > 0 && (
        <div className="mb-4">
          <h2 className="mb-2 text-sm font-semibold">Favoritos</h2>
          <Accordion type="multiple" value={expandedItems} className="w-full">
            {favoriteItems.map((item) => (
              <MenuItemComponent
                key={item.id}
                item={item}
                depth={0}
                visibleItems={visibleItems}
                expandedItems={expandedItems}
                favorites={favorites}
                onToggle={handleToggle}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </Accordion>
        </div>
      )}

      <div>
        <h2 className="mb-2 text-sm font-semibold">Menu</h2>
        <Accordion type="multiple" value={expandedItems} className="w-full">
          {menuItems.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              depth={0}
              visibleItems={visibleItems}
              expandedItems={expandedItems}
              favorites={favorites}
              onToggle={handleToggle}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </Accordion>
      </div>
    </div>
  )
}
