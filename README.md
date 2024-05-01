# Flask-Website

[Main page](https://anonymousrand.xyz)

[Blog page](https://blog.anonymousrand.xyz) (don't click this one)

Huge thanks to [Miguel Grinberg's Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) and also [Noran Saber Abdelfattah's Flask blog guide](https://medium.com/@noransaber685/building-a-flask-blog-a-step-by-step-guide-for-beginners-8bffe925cd0e), otherwise this project would've taken longer to get going and would probably have even more *bad practice* scribbled over it than it already has.

And thank you to GitHub for free image "backups" in my static folders <3

# Developer notes to compensate for possibly scuffed code

**Always check to make sure `config.py` is updated!**

#### Adding new blogpages:
- Register new copy of `blogpage` blueprint with proper blog id/name in `app/__init__.py`
- Update `config.py`
- Update directory names in static paths

#### Adding new forms:
- Make sure that all POST forms should be Ajax using FormData and should handle the custom error(s) defined in `config.py`
  - Ref. `app/static/js/session_util.js`, `app/admin/static/admin/js/form_submit.js`, `app/blog/static/blog/blogpage/js/comments.js`
- Always add HTML classes `login-req-post` to `<form>`s (for handling of CSRF/session expiry in `handleCustomErrors()`) and `auth-true`/`auth-false` (for showing/hiding elements) when needed

#### Updating HTML custom errors:
- Update `config.py`
- Update `app/routes.py` error handlers
- Update `app/static/js/handle_custom_errors.js`

# Blog writer notes

- Custom Markdown syntax:
  - `__[text]__` to underline
  - `~~[text]~~` to strikethrough
  - `\thm` and `\endthm` both surrounded by blank lines to highlight everything inside as a navy blue blockquote
  - `\dropdown` and `\enddropdown` with `\summary` and `\endsummary` as the first part of the content inside, all surrounded by blank lines, to do a `<details>`-style dropdown with custom formatting
  - Insert any inline tag like `<span>` with attribute `data-col-width="[something]%"` inside any table cell to control width for its column
  
- Other syntax notes:
  - Raw HTML (including with attributes!) will be rendered, such as:
      - `<center></center>` for centering individual cells in a table
      - `<pre><code></code></pre>` for code blocks in a table
      - `<small></small>` for small text
      - `<br>` for line breaks that aren't new paragraphs and don't leave extra space, like between lines in a stanza, and `<br>` surrounded by two empty lines for more space than a normal paragraph, like between stanzas
        - `<br><br>` is also useful for when blank lines aren't tolerated or otherwise don't work, like in a footnote, table, or `\dropdown`

- Tables:
  - Use [Markdown tables](https://www.tablesgenerator.com/markdown_tables#) whenever possible, with "Compact mode" and "Line breaks as \<br\>" checked
  - Use [reStructuredText grid tables](https://tableconvert.com/restructuredtext-generator) with "Force separate lines" checked for features such as:
    - Merged cells
      - In order to merge cells, replace intermediate '|' characters generated by the website with a space (every line has to be the same number of chars long for reStructuredText grid tables!)

# Cookie explanation from empirical observations and DevTools
Comparing Flask's built-in session cookie with `PERMANENT_SESSION_LIFETIME` config vs. Flask-Login's remember me cookie with `REMEMBER_COOKIE_DURATION` CONFIG (currently using the first row for no persistent cookies)

|  | Session cookie stored in: | Remember cookie stored in: | PERMANENT_SESSION_LIFETIME effect on session cookie | REMEMBER_COOKIE_DURATION effect on remember cookie | User experience when PERMANENT_SESSION_LIFETIME reached | User experience when REMEMBER_COOKIE_DURATION reached |
|:---:|---|---|---|---|:---:|:---:|
| session.permanent=False, remember=False | Memory (non-persistent) | - | [Invalidated by Flask](https://stackoverflow.com/a/55055558) ([docs](https://flask.palletsprojects.com/en/3.0.x/config/#PERMANENT_SESSION_LIFETIME)) | - | Logged out | - |
| session.permanent=True, remember=False | Disk (persistent) | - | Expires & is deleted | - | Logged out | - |
| session.permanent=False, remember=True | Memory (non-persistent) | Disk (persistent) | Invalidated by Flask | Expires & is deleted | Logged out | Logged out if browser closed |
| session.permanent=True, remember=True | Disk (persistent) | Disk (persistent) | Expires & is deleted | Expires & is deleted | Logged out | Logged out if browser closed |

# Other useless notes

#### Rounds of Markdown processing:
  - Standard `markdown.markdown` with official extension `extra`
  - Custom Markdown extensions in `app/markdown_ext/myextensions.py`
    - Custom Markdown syntax
  - `additional_markdown_processing()` in `app/blog/blogpage/routes.py`
    - Non-custom-syntax stuff that is easier to handle from Flask than from JQuery in round 3, like regex replaces
  - JQuery in `app/static/js/display_customization.js` and `app/blog/static/blog/blogpage/js/display_customization.js`
    - Non-custom-syntax stuff that is easier to handle from JQuery (adding classes for styling etc.)

#### CSS property order (currently-used properties):
- "Specific":
  - `content`
  - `opacity`
  - `color`
  - `background-color`
  - `font-family`
  - `font-weight`
  - `font-style`
  - `font-size`
  - `text-decoration`
  - Other specific ones like `overflow-x`
- "General":
  - `width`
  - `min-width`
  - `max-width`
  - `height`
  - `border`
  - `border-width`
  - `border-radius`
  - `margin`
    - `left`
    - `right`
    - `top`
    - `bottom`
  - `padding`
    - `left`
    - `right`
    - `top`
    - `bottom`
