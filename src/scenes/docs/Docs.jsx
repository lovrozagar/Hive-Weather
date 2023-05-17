import {
  useTheme,
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

import uniqid from 'uniqid'

function Docs() {
  const theme = useTheme().palette

  const content = [
    {
      title: 'Navigacijaska Traka',
      id: 'navbar',
      paragraphs: [
        {
          name: 'App Logo',
          text: 'Služi kao logotip aplikacije i poveznica za 1. zaslon. Na manjoj širini zaslona tekst nestaje i vidljiva je samo slika.',
        },
        {
          name: 'Autocomplete',
          text: 'Kako bi se moglo brže navigirati do drugih gradova, komponenta Autocomplete integrirana je u navigacijsku traku umjesto samo na 1. ekranu. Polje za tekst spojeno je s Google Autcomplete API-em, pokazuje do 5 sugestija prilikom tipkanja, "debounce" funkcija korištena kako bi se normalizirao broj API zahtjeva. U slučaju da unos nije valjan ili grad nije nađen, tooltip s prikladnom porukom pojaviti će se ispod ikone povećala.',
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
          text: 'Prikazuje lokacijske informacije o gradu. Takoder sadrži srce gumb s kojim se poveznica lokacije tipa "week" sprema u (ili miče iz) "localStorage" i "saved" karticu na 1. ekranu. Kartica sadrži i gumb "share" koji prilikom klika koristi Web share API ako je podržan ili, ako nije podržan, kopira poveznicu u međuspremnik.',
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
          text: 'Prikazuje lokacijske informacije o gradu. Takoder sadrži srce gumb s kojim se link lokacija tipa "day" sprema u (ili miče iz) "localStorage" i "saved" karticu na 1. ekranu. Kartica sadrži i gumb "share" koji prilikom klika koristi Web share API ako je podržan ili, ako nije podržan, kopira poveznicu u međuspremnik.',
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
    {
      title: 'Error ekran',
      id: 'error',
      paragraphs: [
        {
          name: 'Poruka i gumb za povratak',
          text: 'Prikazuje poruku o ne postojecoj stranici te gumb koji navigira korisinka natrag na 1. ekran.',
        },
      ],
    },
  ]

  const contentStyle = {
    width: 'fit-content',
    pointer: 'cursor',
    '&:hover > :first-of-type': { textDecoration: 'underline' },
    '&:hover > :last-of-type': { visibility: 'visible' },
  }
  const anchorButtonStyle = {
    visibility: 'hidden',
    color: 'primary.main',
  }
  const paragraphNameStyle = {
    fontStyle: 'italic',
    color: 'primary.main',
    fontWeight: 500,
    mt: 2,
  }
  const textShadowStyle = {
    textShadow: `1px 1px 15px ${theme.tone.lightLow}`,
  }

  return (
    <Container component='main' sx={{ pb: 10 }}>
      <Card sx={{ px: 1, pb: 2 }}>
        <CardHeader
          title={
            <Typography
              component='h1'
              variant='h3'
            >{`Dokumentacija`}</Typography>
          }
        />
        {content.map((screen, index) => (
          <Box key={uniqid()}>
            <Divider sx={{ mt: index !== 0 ? 2 : 0 }} />
            <CardContent id={screen}>
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
                {screen.paragraphs.map((paragraph) => (
                  <Box key={uniqid()}>
                    <Typography
                      component='h3'
                      paragraph
                      sx={paragraphNameStyle}
                    >
                      {paragraph.name}
                    </Typography>
                    <Typography>{paragraph.text}</Typography>
                    <Box gap={1}>
                      {paragraph.api ? (
                        <FlexBox mt={2} gap={1}>
                          <Typography
                            key={uniqid()}
                            color={'tone.light'}
                            sx={textShadowStyle}
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
                            key={uniqid()}
                            color={'tone.light'}
                            sx={textShadowStyle}
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
          </Box>
        ))}
      </Card>
    </Container>
  )
}

export default Docs
