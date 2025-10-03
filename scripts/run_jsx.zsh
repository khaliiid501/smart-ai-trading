#!/bin/zsh

set -euo pipefail

if [ $# -lt 2 ]; then
  echo "❌ استخدم: $0 [ae|ps|ai] filename.jsx"
  exit 1
fi

TARGET="$1"
JSX_ARG="$2"

case "$TARGET" in
  ae)
    APP="Adobe After Effects 2024"
    DEFAULT_BASE="$HOME/interactive-packaging-agent/scripts/aftereffects"
    ;;
  ps)
    APP="Adobe Photoshop 2024"
    DEFAULT_BASE="$HOME/interactive-packaging-agent/scripts/photoshop"
    ;;
  ai)
    APP="Adobe Illustrator 2024"
    DEFAULT_BASE="$HOME/interactive-packaging-agent/scripts/illustrator"
    ;;
  *)
    echo "❌ استخدم: $0 [ae|ps|ai] filename.jsx"
    exit 1
    ;;
esac

if [[ "$JSX_ARG" = /* || "$JSX_ARG" = .* ]]; then
  SCRIPT_PATH="$(cd "$(dirname "$JSX_ARG")" && pwd)/$(basename "$JSX_ARG")"
else
  SCRIPT_PATH="$DEFAULT_BASE/$JSX_ARG"
fi

if [ ! -f "$SCRIPT_PATH" ]; then
  echo "⚠️ الملف غير موجود: $SCRIPT_PATH"
  exit 1
fi

echo "🚀 تشغيل: $SCRIPT_PATH داخل $APP"

if [ "$TARGET" = "ae" ]; then
  osascript -e "tell application \"$APP\" to DoScriptFile \"$SCRIPT_PATH\""
else
  osascript -e "tell application \"$APP\" to do javascript POSIX file \"$SCRIPT_PATH\""
fi

echo "✅ تم التنفيذ بنجاح"
