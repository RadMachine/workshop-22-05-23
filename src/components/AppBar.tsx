import { Icon, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AuthStore } from '../store/auth'

export interface AppBarProps {}

export function AppBar({}: AppBarProps) {
  const navigate = useNavigate()
  const logout = () => {
    AuthStore.logout()
    navigate('/login')
  }

  return (
    <MuiAppBar component="nav">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Система курсов
        </Typography>
        <IconButton size="large" color="inherit" onClick={logout}>
          <Icon>logout</Icon>
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  )
}
