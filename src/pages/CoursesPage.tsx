import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { CourseForm } from '../components/CourseForm'
import { useNavigate } from 'react-router-dom'

export interface CoursesPageProps {}

interface Data {
  id: number
  name: string
  from: Date
  to: Date
}

const createData = (id: number, name: string, from: Date, to: Date): Data => ({ id, name, from, to })

const rows = [
  createData(305, 'Cupcake', new Date(), new Date()),
  createData(452, 'Donut', new Date(), new Date()),
  createData(262, 'Eclair', new Date(), new Date()),
  createData(159, 'Frozen yoghurt', new Date(), new Date()),
  createData(356, 'Gingerbread', new Date(), new Date()),
  createData(408, 'Honeycomb', new Date(), new Date()),
  createData(237, 'Ice cream sandwich', new Date(), new Date()),
  createData(375, 'Jelly Bean', new Date(), new Date()),
  createData(518, 'KitKat', new Date(), new Date()),
  createData(392, 'Lollipop', new Date(), new Date()),
  createData(318, 'Marshmallow', new Date(), new Date()),
  createData(360, 'Nougat', new Date(), new Date()),
  createData(437, 'Oreo', new Date(), new Date()),
]

export function CoursesPage({}: CoursesPageProps) {
  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleClick = (_: React.MouseEvent<unknown>, id: Data['id']) => {
    navigate(`/courses/${id}`)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [showForm, setShowForm] = useState(false)
  const openForm = () => setShowForm(true)
  const onFormClose = () => setShowForm(false)
  const onSubmit = () => {}

  return (
    <Paper sx={{ width: '100%' }}>
      <Toolbar>
        <Typography component="div" variant="h6" sx={{ flex: 1 }}>
          Курсы
        </Typography>
        <Tooltip title="Новый курс">
          <IconButton onClick={openForm}>
            <Icon>add</Icon>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <CourseForm open={showForm} onClose={onFormClose} onSubmit={onSubmit} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Дата начала</TableCell>
              <TableCell>Дата окончания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
              <TableRow key={row.id} onClick={(evt) => handleClick(evt, row.id)} hover sx={{ cursor: 'pointer' }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.from.toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>{row.to.toLocaleDateString('ru-RU')}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow sx={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Элементов на странице"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  )
}
