# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: app/proto/service.proto
# Protobuf Python Version: 5.26.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x17\x61pp/proto/service.proto\"\x13\n\x03Tag\x12\x0c\n\x04name\x18\x01 \x01(\t\"j\n\x0cPhotoRequest\x12\n\n\x02id\x18\x01 \x01(\x03\x12\r\n\x05promt\x18\x02 \x01(\t\x12\x0e\n\x06height\x18\x03 \x01(\x03\x12\r\n\x05widht\x18\x04 \x01(\x03\x12\x0c\n\x04goal\x18\x05 \x01(\t\x12\x12\n\x04tags\x18\x06 \x03(\x0b\x32\x04.Tag\";\n\rPhotoResponse\x12\n\n\x02id\x18\x01 \x01(\x03\x12\x0e\n\x06s3_url\x18\x02 \x01(\t\x12\x0e\n\x06status\x18\x03 \x01(\t2:\n\tMLService\x12-\n\x0cProcessPhoto\x12\r.PhotoRequest\x1a\x0e.PhotoResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'app.proto.service_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_TAG']._serialized_start=27
  _globals['_TAG']._serialized_end=46
  _globals['_PHOTOREQUEST']._serialized_start=48
  _globals['_PHOTOREQUEST']._serialized_end=154
  _globals['_PHOTORESPONSE']._serialized_start=156
  _globals['_PHOTORESPONSE']._serialized_end=215
  _globals['_MLSERVICE']._serialized_start=217
  _globals['_MLSERVICE']._serialized_end=275
# @@protoc_insertion_point(module_scope)
