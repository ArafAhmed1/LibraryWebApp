// Books for future injection to database

const books = [
    {
      "title": "The Silent Patient",
      "author": "Alex Michaelides",
      "genre": "Psychological Thriller",
      "publishedYear": 2019,
      "description": "A woman’s act of violence against her husband and her refusal to speak after the incident creates a complex psychological mystery.",
      "availableCopies": 10,
      "totalCopies": 50,
      "categories": ["Thriller", "Psychological"],
      "pdfLink": "https://link.to.pdf/the-silent-patient.pdf",
      "coverImageLink": "https://link.to.image/the-silent-patient.jpg"
    },
    {
      "title": "Where the Crawdads Sing",
      "author": "Delia Owens",
      "genre": "Mystery, Romance",
      "publishedYear": 2018,
      "description": "A gripping murder mystery intertwined with a beautiful coming-of-age story set in the wild marshes of North Carolina.",
      "availableCopies": 8,
      "totalCopies": 40,
      "categories": ["Mystery", "Romance"],
      "pdfLink": "https://link.to.pdf/crawdads-sing.pdf",
      "coverImageLink": "https://link.to.image/crawdads-sing.jpg"
    },
    {
      "title": "Educated",
      "author": "Tara Westover",
      "genre": "Memoir",
      "publishedYear": 2018,
      "description": "A memoir about a young girl born in a survivalist family and her journey of self-education in the face of unimaginable hardships.",
      "availableCopies": 12,
      "totalCopies": 60,
      "categories": ["Memoir", "Biography"],
      "pdfLink": "https://link.to.pdf/educated.pdf",
      "coverImageLink": "https://link.to.image/educated.jpg"
    },
    {
      "title": "The Night Circus",
      "author": "Erin Morgenstern",
      "genre": "Fantasy, Romance",
      "publishedYear": 2011,
      "description": "A magical and enchanting story about a circus that appears without warning and the rivalry between two illusionists.",
      "availableCopies": 7,
      "totalCopies": 35,
      "categories": ["Fantasy", "Romance"],
      "pdfLink": "https://link.to.pdf/night-circus.pdf",
      "coverImageLink": "https://link.to.image/night-circus.jpg"
    },
    {
      "title": "The Goldfinch",
      "author": "Donna Tartt",
      "genre": "Literary Fiction",
      "publishedYear": 2013,
      "description": "A sweeping novel about loss, obsession, and survival, following the life of a boy who survives an explosion at a museum.",
      "availableCopies": 9,
      "totalCopies": 45,
      "categories": ["Literary Fiction"],
      "pdfLink": "https://link.to.pdf/goldfinch.pdf",
      "coverImageLink": "https://link.to.image/goldfinch.jpg"
    },
    {
      "title": "The Invisible Man",
      "author": "H.G. Wells",
      "genre": "Science Fiction",
      "publishedYear": 1897,
      "description": "The story of a scientist who discovers the secret of invisibility but struggles with the moral and psychological effects of his discovery.",
      "availableCopies": 15,
      "totalCopies": 75,
      "categories": ["Science Fiction", "Classic"],
      "pdfLink": "https://link.to.pdf/invisible-man.pdf",
      "coverImageLink": "https://link.to.image/invisible-man.jpg"
    },
    
    {
      "title": "The Subtle Art of Not Giving a F*ck",
      "author": "Mark Manson",
      "genre": "Self-help",
      "publishedYear": 2016,
      "description": "A no-nonsense guide to living a better life by focusing on what really matters and letting go of the things that don't.",
      "availableCopies": 20,
      "totalCopies": 100,
      "categories": ["Self-help", "Motivation"],
      "pdfLink": "https://link.to.pdf/subtle-art.pdf",
      "coverImageLink": "https://link.to.image/subtle-art.jpg"
    },
    
    {
      "title": "Atomic Habits",
      "author": "James Clear",
      "genre": "Self-help",
      "publishedYear": 2018,
      "description": "A guide to breaking bad habits and forming good ones, focusing on small changes that lead to big results.",
      "availableCopies": 18,
      "totalCopies": 90,
      "categories": ["Self-help", "Productivity"],
      "pdfLink": "https://link.to.pdf/atomic-habits.pdf",
      "coverImageLink": "https://link.to.image/atomic-habits.jpg"
    },
    {
        "title": "The 5th Wave",
        "author": "Rick Yancey",
        "genre": "Dystopian, Sci-fi",
        "publishedYear": 2013,
        "description": "After a series of alien invasions, a young girl must navigate a world ravaged by catastrophe and trust few to survive.",
        "availableCopies": 9,
        "totalCopies": 45,
        "categories": ["Dystopian", "Science Fiction"],
        "pdfLink": "https://link.to.pdf/5th-wave.pdf",
        "coverImageLink": "https://link.to.image/5th-wave.jpg"
      },
      {
        "title": "Circe",
        "author": "Madeline Miller",
        "genre": "Fantasy, Mythology",
        "publishedYear": 2018,
        "description": "A retelling of the Greek myth of Circe, a powerful witch exiled on an island, who struggles with her powers and relationships.",
        "availableCopies": 8,
        "totalCopies": 40,
        "categories": ["Fantasy", "Mythology"],
        "pdfLink": "https://link.to.pdf/circe.pdf",
        "coverImageLink": "https://link.to.image/circe.jpg"
      },
      {
        "title": "Big Little Lies",
        "author": "Liane Moriarty",
        "genre": "Mystery, Drama",
        "publishedYear": 2014,
        "description": "A gripping story about a murder in a small town, where three women’s secrets intertwine in unexpected ways.",
        "availableCopies": 10,
        "totalCopies": 50,
        "categories": ["Mystery", "Drama"],
        "pdfLink": "https://link.to.pdf/big-little-lies.pdf",
        "coverImageLink": "https://link.to.image/big-little-lies.jpg"
      },
      {
        "title": "The Girl on the Train",
        "author": "Paula Hawkins",
        "genre": "Thriller, Mystery",
        "publishedYear": 2015,
        "description": "A psychological thriller about an alcoholic woman who becomes entangled in a missing person case after witnessing something on her daily train ride.",
        "availableCopies": 7,
        "totalCopies": 35,
        "categories": ["Thriller", "Mystery"],
        "pdfLink": "https://link.to.pdf/girl-on-the-train.pdf",
        "coverImageLink": "https://link.to.image/girl-on-the-train.jpg"
      },
      {
        "title": "The Priory of the Orange Tree",
        "author": "Samantha Shannon",
        "genre": "Fantasy",
        "publishedYear": 2019,
        "description": "An epic fantasy novel about dragons, witches, and political intrigue in a world where an ancient war threatens to tear everything apart.",
        "availableCopies": 6,
        "totalCopies": 30,
        "categories": ["Fantasy"],
        "pdfLink": "https://link.to.pdf/priory-of-the-orange-tree.pdf",
        "coverImageLink": "https://link.to.image/priory-of-the-orange-tree.jpg"
      },
      
      {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "publishedYear": 1937,
        "description": "A young hobbit embarks on an adventure to reclaim a treasure from a dragon, forging alliances with elves, dwarves, and men.",
        "availableCopies": 15,
        "totalCopies": 75,
        "categories": ["Fantasy", "Adventure"],
        "pdfLink": "https://link.to.pdf/hobbit.pdf",
        "coverImageLink": "https://link.to.image/hobbit.jpg"
      },
      {
        "title": "The Road",
        "author": "Cormac McCarthy",
        "genre": "Dystopian",
        "publishedYear": 2006,
        "description": "A post-apocalyptic tale about a father and son struggling to survive in a desolate world, facing despair and hope in equal measure.",
        "availableCopies": 12,
        "totalCopies": 60,
        "categories": ["Dystopian"],
        "pdfLink": "https://link.to.pdf/road.pdf",
        "coverImageLink": "https://link.to.image/road.jpg"
      },
      {
        "title": "The Handmaid's Tale",
        "author": "Margaret Atwood",
        "genre": "Dystopian, Feminist",
        "publishedYear": 1985,
        "description": "A dystopian novel about a totalitarian society where women are oppressed, and one woman’s attempt to reclaim her freedom.",
        "availableCopies": 13,
        "totalCopies": 65,
        "categories": ["Dystopian", "Feminist"],
        "pdfLink": "https://link.to.pdf/handmaids-tale.pdf",
        "coverImageLink": "https://link.to.image/handmaids-tale.jpg"
      },
      
      {
        "title": "The Giver",
        "author": "Lois Lowry",
        "genre": "Young Adult, Dystopian",
        "publishedYear": 1993,
        "description": "A young boy in a dystopian society begins to question the perfect world around him as he receives memories of the past from the Giver.",
        "availableCopies": 16,
        "totalCopies": 80,
        "categories": ["Young Adult", "Dystopian"],
        "pdfLink": "https://link.to.pdf/giver.pdf",
        "coverImageLink": "https://link.to.image/giver.jpg"
      },
      
      {
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "genre": "Fantasy, Magic",
        "publishedYear": 1997,
        "description": "A young boy discovers he is a wizard and attends a magical school where he learns about his past and his destiny.",
        "availableCopies": 20,
        "totalCopies": 100,
        "categories": ["Fantasy", "Magic"],
        "pdfLink": "https://link.to.pdf/harry-potter.pdf",
        "coverImageLink": "https://link.to.image/harry-potter.jpg"
      },
      {
        "title": "The Maze Runner",
        "author": "James Dashner",
        "genre": "Dystopian, Adventure",
        "publishedYear": 2009,
        "description": "A group of teens must navigate a maze in a post-apocalyptic world and uncover the mystery behind their predicament.",
        "availableCopies": 10,
        "totalCopies": 50,
        "categories": ["Dystopian", "Adventure"],
        "pdfLink": "https://link.to.pdf/maze-runner.pdf",
        "coverImageLink": "https://link.to.image/maze-runner.jpg"
      },
      {
        "title": "The Outsiders",
        "author": "S.E. Hinton",
        "genre": "Young Adult, Fiction",
        "publishedYear": 1967,
        "description": "A story about two rival groups of teens and their struggles with their different social classes in a small town.",
        "availableCopies": 14,
        "totalCopies": 70,
        "categories": ["Young Adult", "Fiction"],
        "pdfLink": "https://link.to.pdf/outsiders.pdf",
        "coverImageLink": "https://link.to.image/outsiders.jpg"
      },
      {
        "title": "Dune",
        "author": "Frank Herbert",
        "genre": "Science Fiction",
        "publishedYear": 1965,
        "description": "A young nobleman must navigate political intrigue, a desert planet, and his family's legacy to secure power in a far-future world.",
        "availableCopies": 5,
        "totalCopies": 25,
        "categories": ["Science Fiction", "Epic"],
        "pdfLink": "https://link.to.pdf/dune.pdf",
        "coverImageLink": "https://link.to.image/dune.jpg"
      },
      
  ]