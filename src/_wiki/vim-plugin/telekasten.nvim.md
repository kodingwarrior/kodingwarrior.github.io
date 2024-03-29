---
title: Telekasten.nvim
date:  2023-01-20
layout: wiki
tags: vim
---

~~Neovim에 강력한 검색 기능을 제공하는 킹갓제네럴엠퍼러~~ [[vim-plugin/telescope.nvim]] 기반으로 동작하는 zettelkasten management plugin

## Keymap

```lua
-- Telekasten
vim.api.nvim_create_autocmd('FileType', {
  pattern = {'markdown'},
  group = augroup,
  desc = 'Only works on markdown files',
  callback = function(event)
    map('n', "<leader>zf", ":lua require('telekasten').find_notes()<CR>", default_opts)
    map('n', "<leader>zd", ":lua require('telekasten').find_daily_notes()<CR>", default_opts)
    map('n', "<leader>zz", ":lua require('telekasten').follow_link()<CR>", default_opts)
    map('n', "<leader>zT", ":lua require('telekasten').goto_today()<CR>", default_opts)
    map('n', "<leader>zW", ":lua require('telekasten').goto_thisweek()<CR>", default_opts)
    map('n', "<leader>zn", ":lua require('telekasten').new_note()<CR>", default_opts)
    map('n', "<leader>zc", ":lua require('telekasten').show_calendar()<CR>", default_opts)
    map('n', "<leader>zC", ":CalendarT<CR>", default_opts)
    map('n', "<leader>zt", ":lua require('telekasten').toggle_todo()<CR>", default_opts)
    map('n', "<leader>zb", ":lua require('telekasten').show_backlinks()<CR>", default_opts)

    map('n', "<leader>z", ":lua require('telekasten').panel()<CR>", default_opts)

    map('i', "<leader>[", "<cmd>:lua require('telekasten').insert_link({ i=true })<CR>", default_opts)
    map('i', "<leader>zt", "<cmd>:lua require('telekasten').toggle_todo({ i=true })<CR>", default_opts)
    map('i', "<leader>#", "<cmd>lua require('telekasten').show_tags({i = true})<CR>", default_opts)

    -- custom tricky commands
    map('n', "<leader>Zt", ":lua require('telescope.builtin').live_grep(); vim.api.nvim_feedkeys('TODO', 'n', true);<CR>", default_opts)
  end
})
```
