import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scrapeUrl,
  analyzeWebsite,
  clearError,
  clearAnalysis,
} from "../redux/scraperSlice";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Typography,
  Alert,
  Snackbar,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function WebsiteAnalyzer() {
  const dispatch = useDispatch();
  const { content, analysis, loading, error } = useSelector(
    (state) => state.scraper,
  );
  const [url, setUrl] = useState("");
  const [analysisType, setAnalysisType] = useState("custom");
  const [instructions, setInstructions] = useState("");

  const handleScrape = () => {
    if (!url) return;
    dispatch(scrapeUrl(url));
    dispatch(clearAnalysis());
  };

  const handleAnalyze = () => {
    if (!content) return;

    const analysisInstructions =
      analysisType === "custom"
        ? instructions
        : "Analyze the content and classify the target visitors or audience of this website based on their interests, industry, or demographic. Then, create a multiple choice (A, B, C, D) question based on this demographic.";

    dispatch(analyzeWebsite({ content, instructions: analysisInstructions }));
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handleClearAnalysis = () => {
    dispatch(clearAnalysis());
    setUrl("");
    setInstructions("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Website Content Analyzer
        </Typography>

        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={9}>
                <TextField
                  fullWidth
                  label="Website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  error={!!error && !content}
                  helperText={error && !content ? error : ""}
                  disabled={loading}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleScrape}
                  disabled={loading || !url}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <RefreshIcon />
                  }
                >
                  {loading ? "Scraping..." : "Scrape"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {content && (
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <RadioGroup
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="custom"
                    control={<Radio color="primary" />}
                    label="Custom Analysis"
                    disabled={loading}
                  />
                  <FormControlLabel
                    value="classify"
                    control={<Radio color="primary" />}
                    label="Classify Visitors"
                    disabled={loading}
                  />
                </RadioGroup>
              </Box>

              {analysisType === "custom" && (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Analysis Instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  disabled={loading}
                  error={!!error && !analysis}
                  helperText={error && !analysis ? error : ""}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAnalyze}
                    disabled={
                      loading || (analysisType === "custom" && !instructions)
                    }
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearAnalysis}
                    startIcon={<DeleteIcon />}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>

              {analysis && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Analysis Result:
                  </Typography>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, bgcolor: "background.default" }}
                  >
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                      {analysis}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
