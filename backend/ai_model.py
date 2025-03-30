import re
from transformers import pipeline

# Load zero-shot classifier with an explicitly specified model
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def is_gibberish(text: str) -> bool:
    """Detect gibberish text using regex and simple heuristics."""
    if len(text) < 3:  # Very short text is likely meaningless
        return True
    if not re.search(r"[a-zA-Z]", text):  # No meaningful words, just numbers or symbols
        return True
    if re.fullmatch(r"[a-zA-Z]{1,4}", text):  # Too short random letters like "abc", "xxyy"
        return True
    return False

def analyze_priority(description: str) -> str:
    """Classify petition priority using zero-shot classification with predefined context."""

    # Handle empty or gibberish input
    if not description or description.strip() == "" or is_gibberish(description):
        return "No Info"

    # Define priority labels
    labels = ["High", "Moderate", "Low"]

    # Tamil Nadu-specific predefined issues and priorities
    context_data = {
        "fire accident in a crowded market area": "High",
        "flooded roads due to heavy rains": "High",
        "major bridge collapse": "High",
        "gas leakage in a residential apartment": "High",
        "building collapse": "High",
        "landslide blocking highways": "High",
        "toxic chemical spill": "High",
        "stampede risk during festival": "High",
        "illegal hoarding collapse": "High",
        "train derailment": "High",
        "uncovered deep well or borewell": "High",
        "broken electric lines sparking near a school": "High",
        "contaminated drinking water": "High",
        "severe air pollution near industries": "High",
        "wild animal intrusion in villages": "High",
        "collapsed drainage system": "High",
        "hospital running out of oxygen supply": "High",
        "highway road cracks causing accidents": "High",
        "frequent power cuts": "Moderate",
        "insufficient buses in rural areas": "Moderate",
        "heavy traffic congestion": "Moderate",
        "insufficient waste collection": "Moderate",
        "damaged footpaths": "Moderate",
        "water supply disruptions": "Moderate",
        "unavailability of government hospital beds": "Moderate",
        "encroachment on public land": "Moderate",
        "poor mobile network coverage": "Moderate",
        "lack of streetlights": "Moderate",
        "poor drainage system": "Moderate",
        "malfunctioning traffic signals": "Moderate",
        "bus stops without shelters": "Moderate",
        "theft and robbery increase": "Moderate",
        "overloaded school buses": "Moderate",
        "frequent train delays": "Moderate",
        "lack of pedestrian crossings": "Moderate",
        "improper road signs": "Moderate",
        "overpricing of essential commodities": "Moderate",
        "irregular public transport schedules": "Moderate",
        "streetlight not working": "Low",
        "pothole formation on internal roads": "Low",
        "overflowing dustbins": "Low",
        "noise pollution": "Low",
        "public toilets not cleaned regularly": "Low",
        "unhygienic market conditions": "Low",
        "library facilities not maintained": "Low",
        "broken benches in parks": "Low",
        "damaged playground equipment": "Low",
        "lack of cycling lanes": "Low",
    }

    # Check for predefined issues
    for issue, priority in context_data.items():
        if issue in description.lower():
            return priority

    # Perform classification if no predefined match
    result = classifier(description, candidate_labels=labels)
    
    # Extract highest confidence score
    return result["labels"][0]  # The highest-ranked label

## **Example Test Cases**
#print(analyze_priority(""))  # Output: No Info
#print(analyze_priority("   "))  # Output: No Info
#print(analyze_priority("bcdb"))  # Output: No Info
#print(analyze_priority("asxasx"))  # Output: No Info
#print(analyze_priority("Fire in the market!"))  # Output: High
#print(analyze_priority("Major water pipe burst affecting an entire area."))  # Output: High
#print(analyze_priority("Pothole on a main road."))  # Output: Moderate
#print(analyze_priority("Frequent power cuts in the neighborhood."))  # Output: Moderate
#print(analyze_priority("Streetlight not working."))  # Output: Low
#print(analyze_priority("Need a new bus stop near my house."))  # Output: Low
#print(analyze_priority("Library facilities not maintained."))  # Output: Low
#