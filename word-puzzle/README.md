# Word Puzzle vocabulary

The app bundles exactly 500 distinct entries for each of its 22 language options
(11,000 entries in total). They work offline. English is an original curated
selection of everyday vocabulary. The other language lists combine the original
app vocabulary with selected dictionary lemmas.

## Attribution and licence

Dictionary source: **Wiktionary contributors**, English Wiktionary,
<https://en.wiktionary.org/>, extracted by **Kaikki.org / Wiktextract**,
<https://kaikki.org/dictionary/>. Retrieved 27 October 2026.

The vocabulary selection and the accompanying dictionary_review.json are
distributed under **Creative Commons Attribution-ShareAlike 4.0 International**:
<https://creativecommons.org/licenses/by-sa/4.0/>. See LICENSE-CC-BY-SA-4.0.txt.
These terms apply to the vocabulary data, not the application's source code.
Individual source entry histories and contributor attribution are available at
`https://en.wiktionary.org/wiki/<word>?action=history` (URL-encode the word).

Source dictionary URLs follow
`https://kaikki.org/dictionary/<Language>/kaikki.org-dictionary-<Language>.jsonl`.
Language names: German, French, Italian, Japanese, Korean, Portuguese, Russian,
Spanish, Turkish, Arabic, Hindi, Bengali, Marathi, Tamil, Kannada, Malayalam,
Odia, Gujarati, Urdu and Chinese.

Modifications: filtered lemma selection; Unicode NFC normalisation; removal of
spaces, symbols, inflections, names, unsuitable and tagged obsolete vocabulary;
selection of words containing 2–10 grapheme clusters; uppercasing of Latin and
Cyrillic scripts; Simplified/Traditional Chinese conversion with OpenCC; original
app vocabulary retained. Automated filtering is not a native-speaker editorial
review. Dictionary glosses are retained in dictionary_review.json for review.

Frequency rankings from wordfreq 3.1.1 were used to prefer familiar dictionary
entries where that language has data. Attribution: Robyn Speer et al.,
<https://github.com/rspeer/wordfreq>. Its data is CC BY-SA 4.0; see that project's
NOTICE.md for constituent sources. No frequency data is bundled at runtime.
Chinese conversion: OpenCC, <https://github.com/BYVoid/OpenCC>.

## Reusable vocabulary data

The exact runtime vocabulary is freely downloadable, without App Store access or
app purchase, at <https://get-set-go.in/word-puzzle/vocabulary.json>.
Attribution and license: <https://get-set-go.in/word-puzzle/README.md> and
<https://get-set-go.in/word-puzzle/LICENSE-CC-BY-SA-4.0.txt>.
You may reuse and adapt this vocabulary under CC BY-SA 4.0; the app EULA does not
restrict the rights granted by that license for this data.

## Rebuilding the data

1. Install temporary build tools: regex 2026.9.29,
   opencc-python-reimplemented 0.1.7 and wordfreq 3.1.1.
2. Run `python3 tool/import_word_puzzle_dictionary.py`. This downloads candidate
   entries to `/tmp/arena-word-candidates`, never during gameplay.
3. Run `python3 tool/compile_word_puzzle_banks.py`, then Dart format on
   lib/games/word_puzzle_words.dart. seeds.json preserves the app's own vocabulary.
4. Run the Word Puzzle tests. They check counts, uniqueness, grapheme boundaries,
   word placement and solving at all difficulty stages in all language options.

The generated Dart constants are the runtime vocabulary. No network request or
translation service is needed to play.

## Progression

| Levels | Difficulty | Grid | Targets | Maximum graphemes | Placement |
| --- | --- | --- | --- | --- | --- |
| 1–10 | Easy | 6×6 | 4 | 4 | Horizontal / vertical, forward |
| 11–25 | Medium | 7×7 | 5 | 6 | Horizontal / vertical, both directions |
| 26–50 | Hard | 8×8 | 6 | 8 | All eight directions |
| 51–100 | Expert | 9×9 | 8 | 9 | All eight directions |
| 101+ | Master | 10×10 | 10 | 10 | All eight directions |

Longer entries are preferred from level 26. Compact scripts naturally have
shorter words, so difficulty also increases through grid size, target count and
search directions. Recent words are deprioritised within each play session.
