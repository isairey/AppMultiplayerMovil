import { Audio, AVPlaybackStatus } from "expo-av";

class AudioService {

  private sound: Audio.Sound | null = null;

  private status: AVPlaybackStatus | null = null;

  async load(uri: string) {

    try {

      // Detener y liberar el audio anterior
      if (this.sound) {

        try {
          await this.sound.stopAsync();
        } catch {}

        try {
          await this.sound.unloadAsync();
        } catch {}

        this.sound.setOnPlaybackStatusUpdate(null);

        this.sound = null;
        this.status = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        {
          shouldPlay: true,
          progressUpdateIntervalMillis: 500,
        }
      );

      this.sound = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        this.status = status;
      });

    } catch (error) {

      console.log("Error cargando audio:", error);

    }

  }

  async play() {

    if (!this.sound) return;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return;

    if (!status.isPlaying) {
      await this.sound.playAsync();
    }

  }

  async pause() {

    if (!this.sound) return;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await this.sound.pauseAsync();
    }

  }

  async stop() {

    if (!this.sound) return;

    try {

      await this.sound.stopAsync();

      await this.sound.setPositionAsync(0);

    } catch {}

  }

  async unload() {

    if (!this.sound) return;

    try {

      await this.sound.stopAsync();

    } catch {}

    try {

      await this.sound.unloadAsync();

    } catch {}

    this.sound = null;
    this.status = null;

  }

  async seek(position: number) {

    if (!this.sound) return;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return;

    await this.sound.setPositionAsync(position);

  }

  async setVolume(volume: number) {

    if (!this.sound) return;

    await this.sound.setVolumeAsync(volume);

  }

  async setRate(rate: number) {

    if (!this.sound) return;

    await this.sound.setRateAsync(rate, true);

  }

  async getStatus() {

    if (!this.sound) return null;

    return await this.sound.getStatusAsync();

  }

  async isPlaying() {

    const status = await this.getStatus();

    if (!status || !status.isLoaded) return false;

    return status.isPlaying;

  }

  async getDuration() {

    const status = await this.getStatus();

    if (!status || !status.isLoaded) return 0;

    return status.durationMillis ?? 0;

  }

  async getPosition() {

    const status = await this.getStatus();

    if (!status || !status.isLoaded) return 0;

    return status.positionMillis ?? 0;

  }

}

export default new AudioService();