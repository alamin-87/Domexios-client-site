import os
import re

root_dir = r"e:\PH_Batch11\mileston-12\module-71\Assignment\Domexis-client-site\domexis-client-site\src"

replacements = {
    r"useAuth": "useAuth",
    r"useAxiosSecure": "useAxiosSecure"
}

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith((".jsx", ".js")):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in replacements.items():
                new_content = new_content.replace(pattern, replacement)
            
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated: {file_path}")
