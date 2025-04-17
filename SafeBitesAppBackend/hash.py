import pandas as pd
import hashlib
from rapidfuzz import process, fuzz

# Step 1: Load the CSV file
file_path = r"images_content_fssai_allergens.csv"  # Replace with your CSV file path
df = pd.read_csv(file_path)  # Use read_csv for CSV files

# Step 2: Generate hashes for ProductName (case insensitive)
def generate_hash(name):
    return hashlib.md5(name.strip().lower().encode()).hexdigest()

# Convert product names to lowercase and generate hashes
df['ProductHash'] = df['ProductName'].apply(lambda x: generate_hash(x))

# Step 3: Build a hash lookup with allergy columns
def get_allergen_info(row):
    allergens = []
    if row['ContainsCrustacean'] == 1:
        allergens.append("Crustacean")
    if row['ContainsMilk'] == 1:
        allergens.append("Milk")
    if row['ContainsEgg'] == 1:
        allergens.append("Egg")
    if row['ContainsFish'] == 1:
        allergens.append("Fish")
    if row['ContainsNut'] == 1:
        allergens.append("Nut")
    if row['ContainsSoy'] == 1:
        allergens.append("Soy")
    if row['ContainsSulphite'] == 1:
        allergens.append("Sulphite")

    return ', '.join(allergens) if allergens else "No allergens detected"

# Add allergen info to the DataFrame
df['Allergens'] = df.apply(get_allergen_info, axis=1)

# Step 4: Build a hash lookup for fast querying (case insensitive)
hash_lookup = {
    row['ProductHash']: {
        'ProductName': row['ProductName'],
        'Allergens': row['Allergens']
    }
    for _, row in df.iterrows()
}

# Step 5: Query the data (case insensitive)
def query_product(user_input):
    user_input_lower = user_input.strip().lower()  # Convert input to lowercase for case insensitivity

    # Check for exact match in the hash lookup (case insensitive)
    user_input_hash = generate_hash(user_input_lower)
    if user_input_hash in hash_lookup:
        product = hash_lookup[user_input_hash]
        return f"Product found: {product['ProductName']} - Allergens: {product['Allergens']}"

    # Fuzzy matching with substring match consideration
    match_result = process.extractOne(user_input_lower, df['ProductName'].str.lower().tolist(), scorer=fuzz.ratio)

    if match_result and match_result[1] > 50:  # Adjust threshold as necessary
        match = match_result[0]
        matched_row = df[df['ProductName'].str.lower() == match].iloc[0]
        return f"Closest match: {matched_row['ProductName']} - Allergens: {matched_row['Allergens']}"

    return "Product not found."

# Step 6: Test the query
user_input = "Iays"  # Replace with user input
result = query_product(user_input)
print(result)

# Save the modified DataFrame with hashes and allergens (optional)
df.to_csv("products_with_hashes_and_allergens.csv", index=False)  # Save as CSV
