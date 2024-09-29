package main

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/adrg/frontmatter"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx         context.Context
	configStore *ConfigStore
}

// NewApp creates a new App application struct
func NewApp() *App {
	configStore, err := NewConfigStore()
	if err != nil {
		fmt.Printf("could not initialize the config store: %v\n", err)
		return &App{}
	}

	return &App{
		configStore: configStore,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenDirectoryDialog() string {
	path, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Notes Folder",
	})
	if err != nil {
		runtime.LogErrorf(a.ctx, "Error: %+v\n", err)
	}
	return path
}

// GetConfig retrieves the app config and returns it to the frontend
func (a *App) GetConfig() (Config, error) {
	cfg, err := a.configStore.Config()
	if err != nil {
		return Config{}, fmt.Errorf("could not retrieve the configuration: %w", err)
	}
	return cfg, nil
}

func (a *App) SaveFullConfig(cfg Config) error {
	return a.configStore.SaveConfig(cfg)
}

type Frontmatter struct {
	Title       string   `json:"title"`
	IsFavourite bool     `json:"isFavourite"`
	Tags        []string `json:"tags"`
	Path        string   `json:"path"`
	Filename    string   `json:"filename"`
	CreatedAt   string   `json:"createdAt"`
	UpdatedAt   string   `json:"updatedAt"`
}

// Modify your function to return []Frontmatter instead of []map[string]interface{}
func (a *App) WalkFrontmatter() ([]Frontmatter, error) {
	folderPath := "./data"

	var data []Frontmatter

	err := filepath.WalkDir(folderPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		log.Printf("Info: Walking %s", path)

		if !d.IsDir() {
			content, err := os.ReadFile(path)
			if err != nil {
				log.Printf("Error reading file %s: %v", path, err)
				return nil
			}

			var matter struct {
				Title     string   `yaml:"title"`
				Favourite bool     `yaml:"favourite"`
				Tags      []string `yaml:"tags"`
				CreatedAt string   `yaml:"created"`
				UpdatedAt string   `yaml:"modified"`
			}

			_, err = frontmatter.Parse(strings.NewReader(string(content)), &matter)
			if err != nil {
				log.Printf("Error parsing front matter for %s: %v", path, err)
				return nil
			}

			data = append(data, Frontmatter{
				Title:       matter.Title,
				IsFavourite: matter.Favourite,
				Tags:        matter.Tags,
				Path:        path,
				Filename:    d.Name(),
				CreatedAt:   matter.CreatedAt,
				UpdatedAt:   matter.UpdatedAt,
			})
		}

		return nil
	})

	if err != nil {
		log.Fatalf("Error walking directory: %v", err)
	}

	return data, nil
}

func (a *App) GetNote(path string) (string, error) {
	absPath, err := filepath.Abs(path)
	if err != nil {
		return "", err
	}

	fi, err := os.Stat(absPath)
	if err != nil {
		return "", err
	}

	if fi.IsDir() {
		return "", fmt.Errorf("path is a directory")
	}

	content, err := os.ReadFile(absPath)
	if err != nil {
		return "", err
	}

	return string(content), nil
}

// save note
func (a *App) SaveNote(path string, content string) error {
	err := os.WriteFile(path, []byte(content), 0644)
	if err != nil {
		return err
	}
	return nil
}

func (a *App) DeleteNote(path string) error {
	err := os.Remove(path)
	if err != nil {
		return err
	}
	return nil
}
