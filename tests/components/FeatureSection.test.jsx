// tests/components/FeatureSection.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeatureSection from "../../src/components/MainPage/FeatureSection/FeatureSection";

import addNoteScreenshot1 from "../../src/assets/add-note-screenshot-1.png";
import addNoteScreenshot2 from "../../src/assets/add-note-screenshot-2.png";

describe("FeatureSection", () => {
  it("should render the carousel with images", () => {
    render(
      <FeatureSection
        title="Adding a New Note"
        description="Quickly add new notes to keep track of all your tasks and ideas. Our simple interface makes it easy to stay organized."
        images={[addNoteScreenshot1, addNoteScreenshot2]}
      />
    );

    expect(screen.getByText("Adding a New Note")).toBeInTheDocument();
    expect(screen.getByText("Quickly add new notes to keep track of all your tasks and ideas. Our simple interface makes it easy to stay organized.")).toBeInTheDocument();
    
    // Check for first image only
    const firstImage = screen.getAllByAltText("Feature 0")[0];
    expect(firstImage).toBeInTheDocument();
  });

  it("should navigate through the carousel", async () => {
    render(
      <FeatureSection
        title="Adding a New Note"
        description="Quickly add new notes to keep track of all your tasks and ideas. Our simple interface makes it easy to stay organized."
        images={[addNoteScreenshot1, addNoteScreenshot2]}
      />
    );

    // Check initial image
    const firstImage = screen.getAllByAltText("Feature 0")[0];
    expect(firstImage).toBeVisible();

    // Click the next button
    const nextButton = screen.getByLabelText("next slide / item");
    fireEvent.click(nextButton);

    // Wait for the second image to be displayed
    await waitFor(() => {
      const secondImage = screen.getAllByAltText("Feature 1")[0];
      expect(secondImage).toBeVisible();
    });
  });
});
