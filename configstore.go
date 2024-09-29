package main

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/adrg/xdg"
)

type Config struct {
	NotesDir string `json:"notesDir"`
}

func DefaultConfig() Config {
	return Config{
		NotesDir: "",
	}
}

type ConfigStore struct {
	configPath string
}

func NewConfigStore() (*ConfigStore, error) {
	configFilePath, err := xdg.ConfigFile("appname/config.json")

	fmt.Println("ConfigStore | configPath", configFilePath)

	if err != nil {
		return nil, fmt.Errorf("could not resolve path for config file: %w", err)
	}

	return &ConfigStore{
		configPath: configFilePath,
	}, nil
}

func (s *ConfigStore) Config() (Config, error) {
	_, err := os.Stat(s.configPath)
	if os.IsNotExist(err) {
		return DefaultConfig(), nil
	}

	dir, fileName := filepath.Split(s.configPath)
	if len(dir) == 0 {
		dir = "."
	}

	buf, err := fs.ReadFile(os.DirFS(dir), fileName)
	if err != nil {
		return Config{}, fmt.Errorf("could not read the configuration file: %w", err)
	}

	if len(buf) == 0 {
		return DefaultConfig(), nil
	}

	cfg := Config{}
	if err := json.Unmarshal(buf, &cfg); err != nil {
		return Config{}, fmt.Errorf("configuration file does not have a valid format: %w", err)
	}

	return cfg, nil
}

func (s *ConfigStore) SaveConfig(cfg Config) error {
	// Marshal the config struct to JSON
	data, err := json.MarshalIndent(cfg, "", "  ")
	if err != nil {
		return fmt.Errorf("could not marshal config to JSON: %w", err)
	}

	// Ensure the directory exists
	dir := filepath.Dir(s.configPath)
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return fmt.Errorf("could not create config directory: %w", err)
	}

	// Write the config data to the file
	err = os.WriteFile(s.configPath, data, 0644)
	if err != nil {
		return fmt.Errorf("could not write config file: %w", err)
	}

	return nil
}
