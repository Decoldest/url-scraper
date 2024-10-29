import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrapeUrl, analyzeWebsite } from "../redux/scraperSlice";
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
} from "@mui/material";

const WebsiteAnalyzer = () => {
  const dispatch = useDispatch();
  const { content, analysis, loading } = useSelector((state) => state.scraper);
  const [url, setUrl] = useState("");
  const [analysisType, setAnalysisType] = useState("custom");
  const [instructions, setInstructions] = useState("");

  const handleScrape = async () => {
    await dispatch(scrapeUrl(url));
  };

  const handleAnalyze = async () => {
    const analysisInstructions =
      analysisType === "custom"
        ? instructions
        : "Analyze the content and classify the target visitors or audience of this website based on their interests, industry, or demographic.";

    await dispatch(
      analyzeWebsite({ content, instructions: analysisInstructions }),
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Website Content Analyzer
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleScrape}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Scrape Website"}
        </Button>
      </Paper>

      {content && (
        <Paper sx={{ p: 3 }}>
          <RadioGroup
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            row
          >
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom Analysis"
            />
            <FormControlLabel
              value="classify"
              control={<Radio />}
              label="Classify Visitors"
            />
          </RadioGroup>

          {analysisType === "custom" && (
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Analysis Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              margin="normal"
            />
          )}

          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Analyze
          </Button>

          {analysis && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Analysis Result:</Typography>
              <Typography>{analysis}</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default WebsiteAnalyzer;
