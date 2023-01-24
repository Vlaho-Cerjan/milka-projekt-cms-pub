import { Container, Box, Typography } from "@mui/material";
import Title from "../common/title/title";
import Link from "../navigation/Link";
import { StyledContainer } from '../common/container/styledContainer';


const HowToFindUs = ({companyInfo}: any) => {

    return (
      <StyledContainer>
        <Title title="Kako Nas Pronaći?" />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography>
            {companyInfo?.name}
          </Typography>
          <Typography sx={{ maxWidth: "320px", textAlign: "center" }}>
            {companyInfo?.address}
          </Typography>
          <Typography sx={{ mt: "24px" }} variant={"h6"}>
            Radno Vrijeme
          </Typography>
          <Typography>
            {companyInfo?.working_hours}
          </Typography>
          <Typography sx={{ mt: "24px", maxWidth: "50%", textAlign: "center" }}>
              Za rezervaciju ili upite o terminima molimo nazovite <Link href={"tel:"+(companyInfo?.phone).replace(/[\(\)0 ]/g, '')}>{companyInfo?.phone}</Link> ili nam pošaljite poruku na <Link href={"https://wa.me/"+(companyInfo?.phone).replace(/[\+\(\)0 ]/g, '')}>WhatsApp</Link>.
          </Typography>
          <Typography sx={{ mt: "24px", maxWidth: "50%", textAlign: "center" }}>
              Za ostala pitanja pogledajte <Link href={"/faq"}>često postavljena pitanja</Link> ili nam pošaljite upit preko <Link href={"/kontakt"}>kontakt stranice</Link>.
          </Typography>
        </Box>
    </StyledContainer>
    );
}

export default HowToFindUs;