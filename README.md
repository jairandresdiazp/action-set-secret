# Set Secret Action

Create or edit actions secrets in repository or organizations

## Usage

### Inputs

| Name                  | Description                                                                                                                                                                              | Required | Default                 |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| name                  | Secret name                                                                                                                                                                              | true     |                         |
| value                 | Secret value to store                                                                                                                                                                    | true     |                         |
| token                 | Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)                                                                   | true     |                         |
| repository            | Repository or organization to store. Default `github.repository` [context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context) | true     | github.repository       |
| org                   | Indicate organization of repository                                           | false    |                    |
| enviroment            | Indicates the enviroment for secret                                                                                                                                                      | false    |                         |
| owner                 | Indicates owner of repository Default `github.repository_owner` [context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context)  | true     | github.repository_owner |
| visibility            | Configures the access that repositories have to the organization secret. Options are `all`, `private`, `selected`                                                                        | false    |                         |
| selected_repositories | List of repositories that can access the organization secret. Required when `visibility` is `selected`                                                                                   | false    |                         |

### Outputs

### status

Response status code

### data

Response json payload

## Examples

### For personal repo

```YAML
uses: jairandresdiazp/actions-set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: jairandresdiazp/actions-set-secret
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

### For organizations

```YAML
uses: jairandresdiazp/actions-set-secret@v1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: 'my-org'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
  org: true
  visibility: 'all'
```

## References

### References for repository

- [Get a repository public key](https://developer.github.com/v3/actions/secrets/#get-a-repository-public-key)
- [Create or update repository secret](https://developer.github.com/v3/actions/secrets/#create-or-update-a-repository-secret)

### References for organization

- [Get an organization public key](https://developer.github.com/v3/actions/secrets/#get-an-organization-public-key)
- [Create or update an organization secret](https://developer.github.com/v3/actions/secrets/#create-or-update-an-organization-secret)
