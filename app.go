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
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
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

func (a *App) WalkFrontmatter() ([]map[string]interface{}, error) {
	folderPath := "./data"

	var data []map[string]interface{}

	// WalkDir walks the directory tree and calls the function for each file or directory.
	err := filepath.WalkDir(folderPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		log.Printf("Info: Walking %s", path)

		// Check if the entry is a regular file
		if !d.IsDir() {
			// Read the file content
			content, err := os.ReadFile(path)
			if err != nil {
				log.Printf("Error reading file %s: %v", path, err)
				return nil // Skip this file but continue walking
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
				return nil // Skip this file but continue walking
			}

			data = append(data, map[string]interface{}{
				"title":       matter.Title,
				"isFavourite": matter.Favourite,
				"tags":        matter.Tags,
				"path":        path,
				"filename":    d.Name(),
				"createdAt":   matter.CreatedAt,
				"updatedAt":   matter.UpdatedAt,
			})
		}

		return nil
	})

	if err != nil {
		log.Fatalf("Error walking directory: %v", err)
	}

	return data, nil
}

func (a *App) GetNote(path string) string {
	content, err := os.ReadFile(path)
	if err != nil {
		log.Fatalf("Error walking directory: %v", err)
	}

	return string(content)
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
