'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Menu, X, Home, Phone, Bolt, CreditCard, Users } from 'lucide-react'
import Link from 'next/link'
import { colors, spacing, shadows, media, transitions } from '../utils/theme'
import { SimpleThemeToggle } from './ThemeToggle'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${colors.gray[200]};
  transition: all ${transitions.duration.normal} ${transitions.easing.easeOut};
`

const NavWrapper = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;

  ${media.md} {
    padding: 0 ${spacing.xl};
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary[600]};
  text-decoration: none;
  transition: color ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    color: ${colors.primary[700]};
  }
`

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: ${spacing.lg};

  ${media.md} {
    display: flex;
  }
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${spacing.sm};
  color: ${colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};

  &:hover {
    color: ${colors.primary[600]};
    background-color: ${colors.primary[50]};
  }
`

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${spacing.sm};
  color: ${colors.text.secondary};
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};
  touch-action: manipulation;

  &:hover {
    color: ${colors.primary[600]};
    background-color: ${colors.primary[50]};
  }

  &:active {
    transform: scale(0.95);
  }

  ${media.md} {
    display: none;
  }
`

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid ${colors.gray[200]};
  box-shadow: ${shadows.lg};
  padding: ${spacing.lg};
`

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  border-radius: ${spacing.sm};
  color: ${colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: all ${transitions.duration.fast} ${transitions.easing.easeOut};
  margin-bottom: ${spacing.sm};

  &:hover {
    color: ${colors.primary[600]};
    background-color: ${colors.primary[50]};
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/telecom', label: '통신비', icon: Phone },
  { href: '/electricity', label: '전기요금', icon: Bolt },
  { href: '/loan', label: '대출', icon: CreditCard },
  { href: '/subscription', label: '구독관리', icon: Users },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <HeaderContainer>
      <NavWrapper>
        <Logo href="/">
          <Calculator size={24} />
          절약왕
        </Logo>

        <DesktopNav>
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <NavLink 
                key={item.href} 
                href={item.href}
                prefetch={true}
                role="button"
                aria-label={item.label + " 페이지로 이동"}
              >
                <IconComponent size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </DesktopNav>

        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          <SimpleThemeToggle className="hidden md:block" />
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </div>
      </NavWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <MobileNavLink 
                  key={item.href} 
                  href={item.href}
                  prefetch={true}
                  onClick={(e) => {
                    setMobileMenuOpen(false)
                  }}
                  role="button"
                  aria-label={item.label + " 페이지로 이동"}
                >
                  <IconComponent size={20} />
                  {item.label}
                </MobileNavLink>
              )
            })}
            
            {/* 모바일 메뉴 테마 토글 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: spacing.md,
              marginTop: spacing.sm,
              borderTop: "1px solid " + colors.gray[200],
              paddingTop: spacing.lg
            }}>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '500',
                color: colors.text.secondary 
              }}>
                테마 설정
              </span>
              <SimpleThemeToggle />
            </div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  )
}
