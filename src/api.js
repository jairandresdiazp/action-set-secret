const { Octokit } = require('@octokit/core')
const sodium = require('tweetsodium')

/**
 * @class Api
 */
module.exports = class Api {
  /**
   * Generate public key to store secrets
   *
   * @param {any} auth - Auth method
   * @param {string} repo - Repository in format username/repo-name
   * @param {string} owner - Repository owner
   * @param {boolean} org - Is a Organization
   * @returns {Promise<{data: object}>} - Fetch response
   */
  constructor(auth, repo, owner, org = false) {
    this.octokit = new Octokit({ auth })
    this._repo = repo
    this._org = org
    this._owner = owner
    this._base = org ? 'orgs' : 'repos'
  }

  /**
   * Generate public key to store secrets
   *
   * @returns {Promise<{data: object}>} - Fetch response
   */
  async getPublicKey() {
    let { data } = await this.octokit.request('GET /:base/:repo/actions/secrets/public-key', {
      base: this._base,
      repo: this._repo
    })

    return data
  }

  /**
   * Create encrypt secret
   *
   * @param {string} key_id - Secret key id
   * @param {string} key - Secret key
   * @param {string} value - Secret value
   * @returns {{key_id: string, encrypted_value: string}} - Secret data
   */
  async createSecret(key_id, key, value) {
    const messageBytes = Buffer.from(value)

    const keyBytes = Buffer.from(key, 'base64')

    const encryptedBytes = sodium.seal(messageBytes, keyBytes)

    return {
      encrypted_value: Buffer.from(encryptedBytes).toString('base64'),
      key_id
    }
  }

  /**
   * Set secret on repository
   *
   * @param {{encrypted_value:string, key_id:string}} data - Object data to request
   * @param {string} name - Secret name
   * @param {string} enviroment - Secret enviroment
   * @returns {Promise} - Fetch Response
   */
  async setSecret(data, name, enviroment) {
    if (enviroment) {
      return this.octokit.request('PUT /:base/:owner/:repo/environments/:enviroment/secrets/:name', {
        base: this._base,
        owner: this._owner,
        repo: this._repo,
        enviroment,
        name,
        data
      })
    }
    return this.octokit.request('PUT /:base/:repo/actions/secrets/:name', {
      base: this._base,
      repo: this._repo,
      name,
      data
    })
  }

  /**
   * Organization checker
   *
   * @returns {boolean} - Is organization
   */
  isOrg() {
    return this._org
  }
}