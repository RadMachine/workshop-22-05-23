import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { useState } from 'react'

export interface CourseFormProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  edit?: boolean
}

export function CourseForm({ open, onClose, onSubmit, edit }: CourseFormProps) {
  const formTypeText = edit ? 'Изменить' : 'Создать'
  const submitAndClose = () => {
    onSubmit()
    onClose()
  }

  const [date, setDate] = useState<Dayjs | null>(null)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formTypeText} курс</DialogTitle>
      <DialogContent>
        <TextField label="Название" variant="outlined" fullWidth margin="normal" />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            label="Дата проведения"
            value={date}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField label="Описание" variant="outlined" fullWidth margin="normal" multiline rows={6} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={submitAndClose}>{formTypeText}</Button>
      </DialogActions>
    </Dialog>
  )
}
