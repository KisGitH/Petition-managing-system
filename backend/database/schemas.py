def individual_data(petitions):
    return {
        "id": str(petitions["_id"]),
        "name": petitions["name"],
        "address": petitions["address"],
        "gender": petitions["gender"],
        "adhar": petitions["adhar"],
        "subject": petitions["subject"],
        "description": petitions["description"],
        "file_url": petitions["file_url"],
        "department": petitions.get("department", "Uncategorized"),
        "priority": petitions.get("priority", "Moderate"),  # Default to Moderate
        "status": petitions.get("status", "Pending")  # Default status is Pending
    }

def all_Petitions(petitionss):
    return [individual_data(petitions) for petitions in petitionss]
 