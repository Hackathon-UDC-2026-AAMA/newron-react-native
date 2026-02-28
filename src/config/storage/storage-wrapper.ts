import AsyncStorage from "@react-native-async-storage/async-storage";

interface Storage<T> {
  getItem: () => Promise<T | null>;
  setItem: (item: T) => Promise<void>;
  deleteAll: () => Promise<void>;
}

export class StorageWrapper<T> implements Storage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async getItem(): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(this.key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return null as any;
    } catch (error) {
      console.error(`Error getting ${this.key} from AsyncStorage`, error);
      return null;
    }
  }

  async setItem(item: T): Promise<void> {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(item));
    } catch (error) {
      console.error(`Error setting ${this.key} in AsyncStorage`, error);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Error deleting ${this.key} from AsyncStorage`, error);
    }
  }
}
