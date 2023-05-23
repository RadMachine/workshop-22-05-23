import { Paper, Toolbar, Typography, Tooltip, IconButton, Icon, Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseForm } from '../components/CourseForm'
import dayjs from 'dayjs'

export interface CoursePageProps {}

export function CoursePage({}: CoursePageProps) {
  const courseId = Number(useParams().courseId)
  const navigate = useNavigate()
  const toHome = () => navigate('/courses')

  const [showForm, setShowForm] = useState(false)
  const openForm = () => setShowForm(true)
  const onFormClose = () => setShowForm(false)
  const onSubmit = () => {}

  return (
    <Paper sx={{ width: '100%' }}>
      <Toolbar>
        <Typography component="div" variant="h6" sx={{ flex: 1 }}>
          Курс №{courseId}
        </Typography>
        <Tooltip title="Изменить курс">
          <IconButton onClick={openForm}>
            <Icon>edit</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="К списку курсов">
          <IconButton onClick={toHome}>
            <Icon>list</Icon>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CourseForm edit open={showForm} onClose={onFormClose} onSubmit={onSubmit} />
      <Box sx={{ px: 3, pb: 3 }}>
        <Box>
          <Typography component="span" variant="body1" color="white" sx={{ p: 0.5, backgroundColor: 'primary.main' }}>
            {dayjs().format('DD-MM-YYYY')}
          </Typography>
          <Typography component="p" variant="body1" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, soluta? Sunt maiores unde pariatur, cumque
            deserunt asperiores maxime iste mollitia distinctio repellendus ducimus. Cumque saepe ipsum magni laudantium
            odio ducimus. Saepe porro eaque, cum dicta possimus quod, dolore inventore, delectus vel illum fuga? Nemo
            reprehenderit alias at dolor, repellat dolores eos labore, quam impedit quia, dicta aut nulla? Placeat, et?
            Cupiditate iure laboriosam, ratione saepe ipsum esse molestiae amet quisquam distinctio aperiam quibusdam
            neque nisi nobis deleniti dolore repellat est ex eveniet aliquam architecto reprehenderit earum? Dolor
            sapiente enim recusandae! Fugit modi, voluptate saepe accusamus rerum recusandae dolor quae voluptas! Ipsa
            excepturi voluptate corrupti necessitatibus itaque quidem ad cupiditate ex, at totam incidunt? Animi,
            voluptatibus qui fugiat consectetur sed ipsam? Iure, quidem dolor quaerat odit labore, cumque, praesentium
            molestias laudantium aspernatur vitae perferendis sed ut. Culpa et nisi, vitae voluptate blanditiis eius.
            Nisi tempore quibusdam, ad illo nobis optio aperiam.
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
