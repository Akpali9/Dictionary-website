    const searchBtn = document.getElementById('searchBtn');
    const wordInput = document.getElementById('wordInput');
    const resultDiv = document.getElementById('result');

    async function fetchWordDefinition(word) {
      resultDiv.innerHTML = '<p>Loading...</p>';
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
          throw new Error('Word not found');
        }
        const data = await response.json();
        displayDefinition(data);
      } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
      }
    }

    function displayDefinition(data) {
      resultDiv.innerHTML = '';
      const wordData = data[0];

      // Display the word
      const wordTitle = document.createElement('div');
      wordTitle.classList.add('word');
      wordTitle.textContent = wordData.word;
      resultDiv.appendChild(wordTitle);

      // Display phonetics if available
      if (wordData.phonetics && wordData.phonetics.length > 0 && wordData.phonetics[0].text) {
        const phoneticsDiv = document.createElement('div');
        phoneticsDiv.classList.add('phonetics');
        phoneticsDiv.textContent = wordData.phonetics[0].text;
        resultDiv.appendChild(phoneticsDiv);
      }

      // Display definitions
      wordData.meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
          const defDiv = document.createElement('div');
          defDiv.classList.add('definition');
          defDiv.innerHTML = `<strong>${meaning.partOfSpeech}:</strong> ${def.definition}`;
          if (def.example) {
            const exampleDiv = document.createElement('div');
            exampleDiv.classList.add('example');
            exampleDiv.textContent = `Example: ${def.example}`;
            defDiv.appendChild(exampleDiv);
          }
          resultDiv.appendChild(defDiv);
        });
      });
    }

    searchBtn.addEventListener('click', () => {
      const word = wordInput.value.trim();
      if (word) {
        fetchWordDefinition(word);
      }
    });

    wordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const word = wordInput.value.trim();
        if (word) {
          fetchWordDefinition(word);
        }
      }
    });
