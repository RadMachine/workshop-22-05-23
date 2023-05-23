import {
  Box,
  Card,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import classes from './LoginPage.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ILoginData } from '../model/login'
import { AuthStore } from '../store/auth'
import { Formik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { observer } from 'mobx-react-lite'

export interface LoginPageProps {}

export function LoginPage({}: LoginPageProps) {
  const navigate = useNavigate()

  const onSubmit = async (data: ILoginData) => {
    const res = await AuthStore.login(data)
    if (!res.error) navigate('/courses')
  }

  const [showPass, setShowPass] = useState(false)

  const SubmitBtn = observer(() => (
    <LoadingButton
      type="submit"
      loading={AuthStore.state === 'loading'}
      sx={{ mt: 1, display: 'flex', ml: 'auto' }}
      variant="outlined"
    >
      Подтвердить
    </LoadingButton>
  ))

  return (
    <div className={classes['login-page']}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h4" component="h1">
          Вход
        </Typography>
        <Formik initialValues={{ email: 'mock@mail.dev', password: '12345678' }} onSubmit={onSubmit}>
          {({ values, handleSubmit, handleChange, handleBlur }) => (
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
              <TextField
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  label="Пароль"
                  type={showPass ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                        <Icon>{showPass ? 'visibility_off' : 'visibility'}</Icon>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <SubmitBtn />
            </Box>
          )}
        </Formik>
      </Card>
    </div>
  )
}
