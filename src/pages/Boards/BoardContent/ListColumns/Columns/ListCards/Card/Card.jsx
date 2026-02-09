import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography >Card 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.pinimg.com/1200x/af/91/1b/af911b8119ee0cc0d44c031be361a802.jpg"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography >  Title your card   </Typography>
      </CardContent>
      <CardActions sx={{ padding: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>6</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card