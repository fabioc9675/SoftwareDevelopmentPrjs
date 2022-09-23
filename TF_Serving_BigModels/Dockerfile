FROM tensorflow/serving
EXPOSE 8601

COPY . .

RUN tensorflow_model_server --rest_api_port=8601 --allow_version_labels_for_unavailable_models --model_config_file=/48_tf_serving/models.config.conf