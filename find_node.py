import json
with open('figma_full.json', 'r', encoding='utf-8-sig') as f:
    data = json.load(f)

def find_by_id(node, target_id):
    if node.get('id') == target_id:
        return node
    for child in node.get('children', []):
        result = find_by_id(child, target_id)
        if result:
            return result
    return None

def extract_structure(node, indent=0):
    prefix = '  ' * indent
    node_type = node.get('type', '')
    name = node.get('name', '')
    node_id = node.get('id', '')
    
    info = f"{prefix}[{node_type}] {name} (ID: {node_id})"
    
    if 'characters' in node:
        info += f" -> '{node['characters']}'"
    
    print(info)
    
    for child in node.get('children', []):
        extract_structure(child, indent + 1)

print('=== NODE 1-2 STRUCTURE ===')
doc = data.get('document', {})
node = find_by_id(doc, '1:2')
if node:
    extract_structure(node)
else:
    print('Node 1:2 not found!')
