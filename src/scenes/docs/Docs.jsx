import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from '@mui/material'
import { Anchor } from '@mui/icons-material'
import FlexBox from '../../components/FlexBox'
import GridBox from '../../components/GridBox'

function Docs() {
  const content = [
    {
      title: 'Navigacijaska Traka',
      id: 'navbar',
      paragraphs: [
        {
          name: 'App Logo',
          text: 'Sluzi kao logo aplikacije i link za 1. Ekran. Na manjoj sirini ekrana, text nestaje te je samo slika vidljiva.',
        },
        {
          name: 'Autocomplete',
          text: 'Kako bi se moglo brze navigirati do drugih gradova, Autocomplete komponenta integrirana je u navigacijsku traku umjesto samo na 1. ekran. Polje za tekst spojeno je s Google Autcomplete API-em, pokazuje do 5 sugestija prilikom tipkanja, "debounce" funkcija koristena kako bi se normalizirao broj API zahtjeva. U slucaju da input nije validan ili grad nije naden, tooltip sa prikladnom porukom pojaviti ce se ispod ikone povećala.',
          api: 'Google Autocomplete',
        },
        {
          name: 'Popularne lokacije kartica',
          text: 'Prikazuje gumbe u obliku gradova, uvijek su tipa "week" te se klikom na gumb otvara grad sa tjednom prognozom. Popularni gradovi su fiksirani i ne mijenjaju se.',
        },
      ],
    },
  ]

  const contentStyle = {
    width: 'fit-content',
    pointer: 'cursor',
    '&:hover > :last-child': { visibility: 'visible' },
    '&:hover > :first-child': { textDecoration: 'underline' },
  }
  const anchorButtonStyle = {
    visibility: 'hidden',
    color: 'primary.main',
  }

  return (
    <Container sx={{ pb: 10 }}>
      <Card sx={{ px: 1 }}>
        <CardHeader
          title={
            <Typography
              component='h1'
              variant='h3'
            >{`Dokumentacija`}</Typography>
          }
        />
        {content.map((screen, index) => (
          <>
            <Divider sx={{ mt: index !== 0 ? 2 : 0 }} />
            <CardContent key={screen} id={screen}>
              <FlexBox gap={1} sx={contentStyle}>
                <Typography
                  id={screen.id}
                  variant='h5'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  {screen.title}
                </Typography>
                <IconButton href={`#${screen.id}`} sx={anchorButtonStyle}>
                  <Anchor />
                </IconButton>
              </FlexBox>
              <GridBox gap={2}>
                {screen.paragraphs.map((paragraph, index) => (
                  <Box key={index}>
                    <Typography
                      component='h3'
                      paragraph
                      key={index}
                      sx={{
                        fontStyle: 'italic',
                        color: 'primary.main',
                        fontWeight: 500,
                        mt: 2,
                      }}
                    >
                      {paragraph.name}
                    </Typography>
                    <Typography key={index}>{paragraph.text}</Typography>
                    <Box gap={1}>
                      {paragraph.api ? (
                        <FlexBox mt={2} gap={1}>
                          <Typography
                            key={`${paragraph.name}${paragraph?.api}`}
                            color={'primary.dark'}
                          >
                            {`${
                              paragraph.api.split(',').length > 1
                                ? 'API-evi:'
                                : 'API:'
                            } ${paragraph?.api}`}
                          </Typography>
                        </FlexBox>
                      ) : null}
                      {paragraph.packages ? (
                        <FlexBox mt={2} gap={1}>
                          <Typography
                            key={`${paragraph.name}${paragraph?.packages}`}
                            color={'primary.dark'}
                          >
                            {`${
                              paragraph.packages.split(',').length > 1
                                ? 'Package-evi:'
                                : 'Package:'
                            } ${paragraph?.packages}`}
                          </Typography>
                        </FlexBox>
                      ) : null}
                    </Box>
                  </Box>
                ))}
              </GridBox>
            </CardContent>
          </>
        ))}
      </Card>
    </Container>
  )
}

export default Docs
