import { Box } from '@mui/material'
import { AppBar } from './AppBar'
import { Outlet } from 'react-router-dom'

export interface LayoutProps {}

export function Layout({}: LayoutProps) {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pt: 8 }}>
      <AppBar />
      <Box component="main" sx={{ m: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
