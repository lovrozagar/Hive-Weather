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
import { useTheme } from '@emotion/react'

function Docs() {
  const theme = useTheme().palette

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
    {
      title: '1. Ekran (Home)',
      id: 'screen-1',
      paragraphs: [
        {
          name: 'Trenutna lokacija i vrijeme kartica',
          text: 'Prikazuje trenutne vremenske uvjete na korisnikovoj lokaciji ako je pristup lokaciji prihvaćen, ili karticu koja obavještava da je lokacija isključena ako pristup nije odobren.',
          api: 'JavaScript Geolocation, Google Geolocation, Open-Meteo Current',
        },
        {
          name: 'Spremljene lokacije kartica',
          text: 'Prikazuje gumbe u obliku gradova (gradovi se mogu spremati na 2. ili 3. ekranu), mogu biti tipa "tjedan" ili "dan", a klikom na gumb otvara se grad s tjednom ili dnevnom prognozom. Spremljene lokacije žive u "localStorage" i mogu se izbrisati klikom na gumb "remove" koji se nalazi na desnoj strani grada/gumba.',
        },
        {
          name: 'Popularne lokacije kartica',
          text: 'Prikazuje gumbe u obliku gradova, uvijek su tipa "week" te se klikom na gumb otvara grad sa tjednom prognozom. Popularni gradovi su fiksirani i ne mijenjaju se.',
        },
      ],
    },
    {
      title: '2. Ekran (Forecast)',
      id: 'screen-2',
      paragraphs: [
        {
          name: 'Tražena lokacija, spremanje i dijeljenje - kartica',
          text: 'Prikazuje lokacijske informacije o gradu. Takoder sadrži srce gumb s kojim se link lokacija tipa "week" sprema u (ili miče iz) "localStorage" i "saved" odjeljak na 1. ekranu. Kartica sadrži i gumb "share" koji prilikom klika koristi Web share API ako je podržan ili, ako nije podržan, kopira link u meduspremnik.',
          api: 'Web Share API, Open-Meteo Forecast',
        },
        {
          name: 'Dnevne kartice',
          text: 'Prikazuju dan, datum, logo vremena, trajanje dana, temperaturu te dinamički obojani gradijent sukladno maksimalnoj i minimalnoj dnevnoj temperaturi. Pritiskom na gumb "See hourly" otvara se 24 satna prognoza za odabrani dan.',
          api: 'Open-Meteo Forecast',
        },
        {
          name: 'Satelitska karta grada',
          text: 'Googleova satelitska karta s označenim traženim gradom na mapi, sadrži pune funkcije mape, slučajni "scroll" je onemogućen.',
          api: 'Google Maps API',
        },
        {
          name: 'Trenuto vrijeme kartica',
          text: 'Prikazuje trenutno vrijeme grada: temperaturu, opis vremena, smjer puhanja vjetra, brzinu vjetra u obliku ikone i paragrafa.',
          api: 'Open-Meteo Current',
        },
        {
          name: '"Throwback" vrijeme kartica',
          text: 'Prikazuje temperaturu, opis vremena, smjer puhanja vjetra i brzinu vjetra u formi ikona ali i paragrafa za traženi grad, na isti dan i vrijeme nasumično 5-40 godina u prošlosti.',
          api: 'Open-Meteo History',
        },
      ],
    },
    {
      title: '3. Ekran (Hourly)',
      id: 'screen-3',
      paragraphs: [
        {
          name: 'Tražena lokacija, spremanje i dijeljenje - kartica',
          text: 'Prikazuje lokacijske informacije o gradu. Takoder sadrži srce gumb s kojim se link lokacija tipa "week" sprema u (ili miče iz) "localStorage" i "saved" odjeljak na 1. ekranu. Kartica sadrži i gumb "share" koji prilikom klika koristi Web share API ako je podržan ili, ako nije podržan, kopira link u meduspremnik.',
          api: 'Web Share API, Open-Meteo Forecast',
        },
        {
          name: 'Graf temperatura/sati u danu',
          text: 'Prikzauje razinu temperature po satima za odabrani dan. Također sadrži vertikalnu liniju koja precizno označava trenutno vrijeme u traženom gradu. Graf je ineraktivan te se slika grafa može spremiti.',
          packages: 'Moment, Moment-tz, Apex-charts',
        },
        {
          name: 'Satne kartice',
          text: 'Detaljno prikazuju vrijeme za određeni sat u obliku ikona i paragrafa koji se dinamički prilagođava i opisuju vrijeme ovisno o vremenskim uvjetima. Sadrže sljedeće informacije: temperaturu, temperaturu za ugodan osjećaj, opis vremena, mogućnost kiše, omjer naoblake, smjer vjetra, brzinu vjetra, vidljivost, atmosferski tlak, vlažnost, UV indeks i količinu snježnih oborina. Pritiskom na strelicu, pokazu/sakriju se detaljne informacije.',
          api: 'Open-Meteo Hourly',
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
                            color={'tone.light'}
                            sx={{
                              textShadow: `1px 1px 15px ${theme.tone.lightLow}`,
                            }}
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
                            color={'tone.light'}
                            sx={{
                              textShadow: `1px 1px 15px ${theme.tone.lightLow}`,
                            }}
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
