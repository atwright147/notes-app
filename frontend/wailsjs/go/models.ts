export namespace main {
	
	export class Config {
	    notesDir: string;
	
	    static createFrom(source: any = {}) {
	        return new Config(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.notesDir = source["notesDir"];
	    }
	}
	export class Frontmatter {
	    title: string;
	    isFavourite: boolean;
	    tags: string[];
	    path: string;
	    filename: string;
	    createdAt: string;
	    updatedAt: string;
	
	    static createFrom(source: any = {}) {
	        return new Frontmatter(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.isFavourite = source["isFavourite"];
	        this.tags = source["tags"];
	        this.path = source["path"];
	        this.filename = source["filename"];
	        this.createdAt = source["createdAt"];
	        this.updatedAt = source["updatedAt"];
	    }
	}

}

