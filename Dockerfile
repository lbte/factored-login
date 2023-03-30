# backend
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /app
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r ./backend/requirements.txt
COPY . .
COPY --from=frontend /app/build /app/static
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# frontend
FROM node:alpine as frontend
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ /app/
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
