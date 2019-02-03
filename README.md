# Enriched Text Plugin

Enriched Text Plugin allows query data in a text panel.

### Query format
query variable must be placed in brackets with a leading dollar sign

`$(queryVar)`

query modifiers must be placed around the query var

`$(max(queryVar))`

all query variables must be within double braces

`{{ }}`

everything within the double braces will be reproduced for the number of groups the query returns
example:

`{{ <p> $(hostname) has id of $(id) </p>}}`

could produce:
```
Joshk has id of 3
AdamC has id of 12
```

#### Current limitations
- Content updates dont auto rerender
- Html only, no markdown
- No snapshots
- 1 template per panel
- max is currently the only modifier
