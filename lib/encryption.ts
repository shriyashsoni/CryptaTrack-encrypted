/**
 * Client-side encryption utilities for portfolio data
 * Uses Web Crypto API instead of Node.js crypto for browser compatibility
 */

export class ClientEncryption {
  /**
   * Generate a keypair for the user (stored in browser)
   */
  static async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"],
    )

    const publicKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey)
    const privateKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey)

    return {
      publicKey: JSON.stringify(publicKeyJwk),
      privateKey: JSON.stringify(privateKeyJwk),
    }
  }

  /**
   * Encrypt data with AES-GCM using Web Crypto API
   */
  static async encryptData(data: any, password: string): Promise<string> {
    const encoder = new TextEncoder()
    const passwordData = encoder.encode(password)

    // Derive key from password
    const key = await window.crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, ["deriveKey"])

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"],
    )

    const iv = window.crypto.getRandomValues(new Uint8Array(16))
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      derivedKey,
      encoder.encode(JSON.stringify(data)),
    )

    const encryptedArray = Array.from(new Uint8Array(encrypted))
    const ivArray = Array.from(iv)

    return JSON.stringify({
      iv: ivArray,
      data: encryptedArray,
    })
  }

  /**
   * Decrypt data with AES-GCM using Web Crypto API
   */
  static async decryptData(encryptedString: string, password: string): Promise<any> {
    const encoder = new TextEncoder()
    const passwordData = encoder.encode(password)
    const { iv, data } = JSON.parse(encryptedString)

    // Derive key from password
    const key = await window.crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, ["deriveKey"])

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      key,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    )

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      derivedKey,
      new Uint8Array(data),
    )

    return JSON.parse(new TextDecoder().decode(decrypted))
  }

  /**
   * Hash sensitive data for comparison without revealing values
   */
  static async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder()
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", encoder.encode(data))
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }
}

/**
 * Hook for managing encrypted portfolio data in local storage
 */
export function useEncryptedStorage(key: string) {
  const store = async (data: any, password: string) => {
    const encrypted = await ClientEncryption.encryptData(data, password)
    if (typeof window !== "undefined") {
      localStorage.setItem(key, encrypted)
    }
  }

  const retrieve = async (password: string) => {
    if (typeof window === "undefined") return null
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    return await ClientEncryption.decryptData(encrypted, password)
  }

  const clear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  }

  return { store, retrieve, clear }
}
